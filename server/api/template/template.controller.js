'use strict';

var _       = require('underscore');
var tpls    = require('./../../templates');
var JSZip   = require('jszip');

exports.save = function(req, res) {
  var user = req.user;

  tpls.generate(user._id, null, req.body, function(err) {
    console.log('preview generation done');
    console.log(err);
    tpls.generate(user._id, 'template', req.body, function(err) {
      console.log('template generation done');
      console.log(err);
      res.status(200).json({
        id: user._id
      });
    });
  });
}

exports.preview = function(req, res) {
  var id = req.params.userId;
  var previewPath = require('path').normalize(__dirname + '/../../templates/tpl/' + id +'/preview.html');
  if(require('fs').existsSync(previewPath)) {
    return res.sendFile(previewPath);
  }
  res.send('<h1>Page Not found</h1>');
}

exports.download = function(req, res) {
  var zip = new JSZip();
  zip.file('index.html', require('fs').readFileSync(
    require('path').normalize(__dirname + '/../../templates/tpl/' + req.params.userId +'/index.html')
  ));

  var buffer = zip.generate({type:"nodebuffer"});

  var zipPath = require('path').normalize(__dirname + '/../../templates/tpl/' + req.params.userId +'/template.zip');
  require('fs').writeFile(zipPath, buffer, function(err) {
    if (err) throw err;
    res.download(zipPath, 'template.zip', function() {

    });
    // res.send('done');
  });

}
