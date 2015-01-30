(function(global) {
  'use strict';
  var passport        = require('passport');
  var TumblrStrategy  = require('passport-tumblr').Strategy;
  var extend          = require('util')._extend;

  global.setup = function(User, config) {
    passport.use(new TumblrStrategy({
      consumerKey: config.tumblr.clientID,
      consumerSecret: config.tumblr.clientSecret,
      callbackURL: config.tumblr.callbackURL
    }, function(token, tokenSecret, profile, done) {
      var tumblrUser = profile._json.response.user;
      console.log('token:', token);
      console.log('tokenSecret:', tokenSecret);

      User.findOne({
        'tumblr.name': profile.username
      },function(err, user) {
        if (err) {
          if(err)
            return done(err);

          user.tumblr.token = token;
          user.tumblr.token_secret = tokenSecret;
          user.save(function(err) {
            return done(err);
          });
        }
        if (!user) {
          user = new User({
            name: tumblrUser.blogs[0].title,
            role: 'user',
            username: profile.username,
            provider: 'tumblr',
            tumblr: extend(profile._json.response.user, {
              token: token,
              token_secret: tokenSecret
            })
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));

  };

})(exports);
