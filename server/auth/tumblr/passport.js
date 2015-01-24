(function(global) {
  'use strict';
  var passport        = require('passport');
  var TumblrStrategy  = require('passport-tumblr').Strategy;

  global.setup = function(User, config) {
    passport.use(new TumblrStrategy({
      consumerKey: config.tumblr.clientID,
      consumerSecret: config.tumblr.clientSecret,
      callbackURL: config.tumblr.callbackURL
    }, function(token, tokenSecret, profile, done) {
      var tumblrUser = profile._json.response.user;
      User.findOne({
        'username': profile.username
      },function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            name: tumblrUser.blogs[0].title,
            role: 'user',
            username: profile.username,
            provider: 'tumblr',
            tumblr: profile._json
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
