'use strict';
var fs          = require('fs');
var util        = require('util');
var _           = require('underscore');
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

var getStrStyle = function(style) {
  var strStyle = '';
  _.each(style, function(val, key) {
    strStyle += util.format('%s: %s;', key, val);
  });

  return util.format('{ %s }', strStyle);
}

var transformBlock = function(doc, el, tplType, options) {
  // el = el.prev();
  var tmp = el;

  for(var key in options) {
    switch(key) {
      case 'class':
        el.addClass(options.class);
        break;
      case 'text':
      case 'textVar':
        el.text((tplType === 'template' ? util.format('{%s}', options.textVar) : options.text));
        break;
      case 'style':
        var id = ID.generate();
        el.attr('id', id);
        doc('head').append('<style type="text/css"> #' + id + ' ' + getStrStyle(options.style) +'</style>');
        break;
    }
  }

  if(tplType === 'template' && options.block) {
    tmp.before(util.format('{block:%s}', options.block));
    tmp.after(util.format('{/block:%s}', options.block));
  }
}

var transform = function (doc, root, items, transformType) {
  items = util.isArray(items) ? items : [];
  if(items.length == 0) {
    return;
  }

  for(var i = 0, l = items.length; i < l; i++) {
    var el = cheerio(util.format('<%s/>', items[i].type));

    root.append(el);

    transformBlock(doc, el, transformType, items[i]);

    transform(
      doc,
      el,
      items[i].items,
      transformType
    );
  }
}


var tpls = module.exports = {};

tpls.generate = function(userId, tplType, structure, callback) {
  var htmlPath = require('path').join(__dirname + '/tpl/' + (tplType === 'template' ? 'tumblr' : 'base') + '.html');
  var base = fs.readFile(htmlPath, function(err, html) {
    if(err) {
      return callback(err);
    }

    var dom = cheerio.load(html.toString());

    // console.log(dom.html());
    fs.readFile(require('path').join(__dirname + '/css/base.css'), function(err, style) {
       var dom = cheerio.load(html.toString());
       style && dom('head').append(util.format('<style type="text/css">%s</style>', style));

       transform(dom, dom('body'), structure, tplType);

       var strHtml = beautifier(dom.html(), {
         indent_size: 2
       });

      //  console.log(strHtml);
       var userDir = __dirname + '/tpl/' + userId;
       if(!fs.existsSync(userDir)) {
         fs.mkdirSync(userDir);
       }

       //console.log(strHtml);
       fs.writeFile(userDir + '/' + (tplType=== 'template' ? 'index' : 'preview') + '.html', strHtml, function(err) {
         callback(err);
       });
     });

  });
}
