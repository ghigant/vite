(function() {
  'use strict';
  angular.module('vite', [
    'vite.shared',
    'vite.home',
    'vite.editor'
  ])
  .config([
      '$locationProvider',
      '$modalProvider',
      function($locationProvider, $modalProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        angular.extend($modalProvider.defaults, {
          animation: 'active',
          backdrop: '<div>plm</div>'
        });
      }
    ]);
})();
