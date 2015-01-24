(function() {
  'use strict';

  var config = {
    auth: {
      local: '/auth/local',
      tumblr: '/auth/tumblr'
    }
  }

  var AuthService = {
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

    }
  };

  $('.modal-login button.submit').click(function() {
      console.log('go-login click');
      AuthService.login('test@test.com', 'test')
        .done(function(response) {
          $(location).attr('href', '/editor');
        })
        .fail(function(response) {
          console.log('login fail', response.message);
        })
  });

})();
