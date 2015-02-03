(function(define, angular) {
  'use strict';

  define([
    'editor/config',
    'editor/router'
  ], function(config, Router) {
      var module = angular.module(config.name, ['ui.router', 'ngAnimate'])
        .config([
          '$controllerProvider',
          '$provide',
          function($ctrlProvider, $provide) {
            module.controller = $ctrlProvider.register;
            module.service    = $provide.service;
            module.factory    = $provide.factoty;
          }
        ])
        .config(Router);

      return module;
  });

})(define, angular);
