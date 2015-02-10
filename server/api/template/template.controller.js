'use strict';

var _       = require('underscore');
var tpls    = require('./../../templates');

exports.save = function(req, res) {
  var user = req.user;
  console.log(tpls);
  console.log(user);
  console.log(req.body);

  tpls.generate(user._id, req.body);

  return res.status(200).json({
    id: 'previewid'
  });
}
