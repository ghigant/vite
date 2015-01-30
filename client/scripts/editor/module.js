(function() {
  'use strict';
  var config = {
    views: '/scripts/editor/views'
  };
  angular.module('vite.editor', ['vite.shared', 'ngRoute', 'ngAnimate', 'mgcrea.ngStrap'])
    .constant('vite.editor.config', config)
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.when('/editor', {
          templateUrl: config.views + '/index.html',
          controller: 'vite.editor.UIEditorCtrl',
          resolve: {
            isLogged: [
              '$location',
              '$q',
              'vite.shared.AuthService',
              function($location, $q, AuthService) {
                var deferred = $q.defer();
                AuthService.isLoggedInAsync(function(loggedIn) {
                  return deferred.resolve(loggedIn);

                });

                return deferred.promise;
            }]
          }
        });
      }
    ]);
})();
