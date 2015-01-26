(function() {
  'use strict';
  var config = {
    views: '/scripts/editor/views'
  };
  angular.module('vite.editor', ['ngRoute', 'ngAnimate'])
    .constant('vite.editor.config', config)
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.when('/editor', {
          templateUrl: config.views + '/layout.html',
          controller: 'vite.editor.EditorCtrl'
        });
      }
    ]);
})();