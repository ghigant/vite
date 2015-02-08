(function(define, angular) {
  'use strict';

  define([
    'home/config',
    'home/router'
  ], function(Config, Router) {
    return angular.module(Config.name, ['ui.router', 'ui.bootstrap'])
      .config(Router);
  });
})(define, angular);
