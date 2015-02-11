'use strict';
var fs          = require('fs');
var util        = require('util');
var cheerio     = require('cheerio');
var beautifier  = require('node-beautifier/modules/beautify-html.js').html_beautify;

var ID = (function() {
  var id = 0;
  return {
    generate: function() {
      return 'vite-' + (++id);
    }
  }
})();
/*
var structure = [{
  type: 'div',
  class: 'row',
  style: {
    'font-size': '30px'
  },
  items: [{
    type: 'div',
    class: 'col-2',
    items: [{
      type: 'h1',
      text: 'Blog Title'
    },{
      type: 'p',
      text: 'My first tumblr blog'
    }]
  },{
    type: 'div',
    class: 'col-2'
  }]
}];
*/
var transform = function (doc, root, items) {
  items = util.isArray(items) ? items : [];
  if(items.length == 0) {
    return;
  }

  for(var i = 0, l = items.length; i < l; i++) {
    var el = cheerio(util.format('<%s/>', items[i].type));
    for(var key in items[i]) {
      switch(key) {
        case 'class':
          el.addClass(items[i].class);
          break;
        case 'text':
          el.text(items[i].text);
          break;
        case 'style':
          var id = ID.generate();
          el.attr('id', id);
          doc('head').append('<style type="text/css"> #' + id + ' { font-size: 30px; }</style>');
          break;
      }
    }
    root.append(el);

    transform(
      doc,
      el,
      items[i].items
    );
  }
}


var tpls = module.exports = {};

tpls.generate = function(userId, structure, callback) {
  var htmlPath = require('path').join(__dirname + '/tpl/base.html');
  var base = fs.readFile(htmlPath, function(err, html) {
    if(err) {
      return callback(err);
    }

    var dom = cheerio.load(html.toString());

    transform(dom, dom('body'), structure);
    // console.log(dom.html());
    fs.readFile(require('path').join(__dirname + '/css/base.css'), function(err, style) {
       style && dom('head').append(util.format('<style type="text/css">%s</style>', style));
       var strHtml = beautifier(dom.html(), {
         indent_size: 2
       });

      //  console.log(strHtml);
       var userDir = __dirname + '/tpl/' + userId;
       if(!fs.existsSync(userDir)) {
         fs.mkdirSync(userDir);
       }

       fs.writeFile(userDir + '/preview.html', strHtml, function(err) {
         callback(err);
       });
     });

  });
}
