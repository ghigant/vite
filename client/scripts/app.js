(function() {
  'use strict';
  angular.module('vite', [
    // 'vite.shared',
    // 'vite.account',
    'vite.home',
    'vite.editor',
    'ngCookies'
  ])
  .config([
    '$locationProvider',
    // '$modalProvider',
    '$httpProvider',
    function($locationProvider, $httpProvider) {
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');

      $httpProvider.interceptors.push('authInterceptor');
    }
  ])
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run([
    '$rootScope',
    '$location',
    // 'vite.shared.AuthService',
    function($rootScope, $location, AuthService) {
      $rootScope.$on('$routeChangeStart', function (event, next) {});
      $rootScope.$on('$routeChangeError', function() {
        console.log('$routeChangeError');
        console.log(arguments);
      });
    }
  ]);
})();
