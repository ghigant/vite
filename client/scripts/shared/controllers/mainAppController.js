(function() {
  'use strict';

  function MainAppController($scope, $location) {
    $scope.isHomePage = function() {
      return $location.url() === '/';
    }
  }

  angular.module('vite.shared')
    .controller('vite.shared.MainAppCtrl', [
      '$scope',
      '$location',
      MainAppController
    ]);

})();
