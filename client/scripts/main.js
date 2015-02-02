(function(define) {
  'use strict';

  define([
    'home/module',
    'editor/module'
    ],
    function(home, editor) {
      var app = angular.module('vite', [
        'ui.router',
        home.name,
        editor.name
      ]);

      app.config([
        '$locationProvider',
        function($locationProvider) {
          $locationProvider.html5Mode(true);
          $locationProvider.hashPrefix('!');

        }
      ]);


      angular.bootstrap(document.getElementsByTagName('body')[0], ['vite']);

      return app;
  });
})(define);
