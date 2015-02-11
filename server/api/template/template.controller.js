'use strict';

var _       = require('underscore');
var tpls    = require('./../../templates');

exports.save = function(req, res) {
  var user = req.user;

  tpls.generate(user._id, req.body, function(err) {
    console.log('generation done');
    console.log(err);

    res.status(200).json({
      id: user._id
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
