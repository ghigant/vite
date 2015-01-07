(function() {
  'use strict';
  var config = {
    views: '/scripts/home/views'
  };
  angular.module('vite.home', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap'])
    .constant('vite.home.config', config)
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: config.views + '/layout.html',
          controller: 'vite.home.MainCtrl'
        });
      }
    ]);
})();
