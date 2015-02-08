(function() {
  'use strict';
  function MainCtrl($scope, config) {
  
  }

  angular.module('vite.home')
    .controller('vite.home.MainCtrl', [
      '$scope',
      // '$modal',
      'vite.home.config',
      MainCtrl
    ]);
})();
