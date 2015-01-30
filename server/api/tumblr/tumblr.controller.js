'use strict'

var tumblr = require('tumblr.js');
var config = require('../../config/environment');
var User  = require('./../user/user.model');


exports.index = function(req, res) {
  var options = {
    consumer_key: config.tumblr.clientID,
    consumer_secret: config.tumblr.clientSecret,
    token: 'PW5ZmYwMR6gllyxWsDRCMbqiu8yunEcRt42bbmUrRcwJqP7jUV',
    token_secret: 'lOHj3mhGMT76jnzugbdPFJn6l0D23S7iO3CQaZ37IoYUZyFmJ3'
  };

  var client = tumblr.createClient(options);
  client.userInfo(function(err, data) {
    return res.json(200, data);
  });
}

exports.info = function(req, res) {
  var userId = req.user._id;

  User.findOne({
    _id: userId
  }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);

    if(user.provider === 'tumblr') {
      var client = tumblr.createClient({
        consumer_key: config.tumblr.clientID,
        consumer_secret: config.tumblr.clientSecret,
        token: user.tumblr.token,
        token_secret: user.tumblr.token_secret
      });

      client.userInfo(function(err, data){
        if (err) return next(err);
        return res.status(200).json(data.user)
        // return res.json(200, data.user);
      });

    } else {
      res.json(200,{});
    }

  });
}
