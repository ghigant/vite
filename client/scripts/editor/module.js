(function() {
  'use strict';
  var config = {
    views: '/scripts/editor/views'
  };
  angular.module('vite.editor', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap'])
    .constant('vite.editor.config', config)
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.when('/editor', {
          templateUrl: config.views + '/index.html',
          controller: 'vite.editor.UIEditorCtrl'
        });
      }
    ]);
})();
