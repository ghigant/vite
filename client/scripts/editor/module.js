(function(define, angular) {
  'use strict';

  define([
    'editor/config',
    'editor/router'
  ], function(config, Router) {
      var module = angular.module(config.name, ['ui.router', 'ngAnimate'])
        .config([
          '$controllerProvider',
          '$compileProvider',
          '$provide',
          function($ctrlProvider, $compileProvider, $provide) {
            module.controller = $ctrlProvider.register;
            module.service    = $provide.service;
            module.factory    = $provide.factoty;
            module.directive  = $compileProvider.directive
          }
        ])
        .config(Router);

      return module;
  });

})(define, angular);
