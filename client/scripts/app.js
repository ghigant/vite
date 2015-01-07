(function() {
  'use strict';
  angular.module('vite', [
    'vite.home',
    'vite.editor'
  ])
  .config([
      '$locationProvider',
      function($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
      }
    ]);
})();
