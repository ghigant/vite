(function(define, angular) {
  'use strict';

  define(function() {
    var module = angular.module('vite.account', ['ngResource', 'ngCookies']);

    module.config([
        '$controllerProvider',
        '$compileProvider',
        '$provide',
        function($ctrlProvider, $compileProvider, $provide) {
          module.controller = $ctrlProvider.register;
          module.service    = $provide.service;
          module.factory    = $provide.factoty;
          module.directive  = $compileProvider.directive
        }
      ]);
    return module;
  });
})(define, angular);
