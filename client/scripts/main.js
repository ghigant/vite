(function(define) {
  'use strict';

  define([
    'home/module',
    'editor/module',
    'account/module',
    'account/services/authInterceptor.service'
    ],
    function(home, editor, account, authInterceptor) {
      var app = angular.module('vite', [
        'ui.router',
        'ngAnimate',
        'ngCookies',
        'contenteditable',
        account.name,
        home.name,
        editor.name
      ])
      .factory('authInterceptor', [
        '$rootScope',
        '$q',
        '$cookieStore',
        '$location',
        authInterceptor
      ])
      .config([
        '$locationProvider',
        '$httpProvider',
        function($locationProvider, $httpProvider) {
          $locationProvider.html5Mode(true);
          $locationProvider.hashPrefix('!');

          $httpProvider.interceptors.push('authInterceptor');
        }
      ])
      .run([
        '$rootScope',
        '$location',
        '$state',
        account.name + '.AuthService',
        function($rootScope, $location, $state, AuthService) {
          $rootScope.$on('$stateChangeStart', function (event, next) {
            AuthService.isLoggedInAsync(function(loggedIn) {
              if (next.name.split('.').shift() === 'editor' && !loggedIn) {
                event.preventDefault();
                $state.go('vite.login')
              }
            });
          })
        }
      ]);

      angular.bootstrap(document.getElementsByTagName('body')[0], ['vite']);

      return app;
  });
})(define);
