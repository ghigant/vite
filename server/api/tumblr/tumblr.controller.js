'use strict'

var _       = require('underscore');
var tumblr  = require('tumblr.js');
var config  = require('../../config/environment');
var User    = require('./../user/user.model');


exports.info = function(req, res) {
  var user = req.user;
  var filter = req.params.filter || '';
  console.log('fiter');
  console.log('filter:', filter);
  if(user.provider === 'tumblr') {
    var client = tumblr.createClient({
      consumer_key: config.tumblr.clientID,
      consumer_secret: config.tumblr.clientSecret,
      token: user.tumblr.token,
      token_secret: user.tumblr.token_secret
    });

    client.userInfo(function(err, data){
      if (err) return next(err);
      if(filter !== '') {
        if(_.has(data.user, filter)) {
          res.status(200).json(data.user[filter]);
        } else {
          res.status(404);
        }
      } else {
        return res.status(200).json(data.user);
      }
    });

  } else {
    // TODO fallback for local accounts
    res.json(200,{});
  }
}
