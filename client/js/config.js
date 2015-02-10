(function(global) {
  'use strict';

  global.config = global.config || (global.config = {});

  global.config.auth = {
    local: '/auth/local',
    tumblr: '/auth/tumblr'
  };

})(typeof exports !== 'undefined' ? exports : this);
