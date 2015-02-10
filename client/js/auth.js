(function(global) {
  'use strict';

  global.auth = global.auth|| (global.auth = {});
  var auth = global.auth;

  auth.AuthService = {
    login: function(username, password) {
      var defer = $.Deferred();
      $.post(config.auth.local, {
        email: username,
        password: password
      }).done(function(response) {
        defer.resolve(response);
      }).fail(function(response) {
        defer.reject(response.responseJSON);
      });

      return defer.promise();
    },
    oauth: function(provider) {
      $(location).attr('href', config.auth[provider]);
    }
  };
})(typeof exports !== 'undefined' ? exports : this);
