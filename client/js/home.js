(function(global) {
  'use strict';

  var config = global.config,
    auth = global.auth;

  function getLoginData() {
    return {
      username: $('.modal-login input[name="username"]').val(),
      password: $('.modal-login input[name="password"]').val()
    };
  }

  function authSuccess() {
    $(location).attr('href', '/editor');
  }

  $('.modal-login button').on('click', function(event) {
    var target = $(event.currentTarget);
    if(target.hasClass('log-tumblr')) {
      auth.AuthService.oauth('tumblr');
    } else if(target.hasClass('submit')) {
      var data  = getLoginData();
      auth.AuthService.login(data.username, data.password)
        .done(authSuccess)
        .fail(function() {
          console.log('login fail');
        });
    }
  });

})(typeof exports !== 'undefined' ? exports : this);
