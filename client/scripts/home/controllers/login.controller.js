(function() {
  'use strict';

  angular.module('vite.home')
    .controller('vite.home.LoginCtrl', [
      '$scope',
      '$state',
      '$modalInstance',
      function($scope, $state, $modalInstance) {
        console.log($modalInstance);
        $scope.login = function() {

        }

        $scope.$on('$stateChangeStart', function() {
          console.log('$stateChangeStart');
          $modalInstance.dismiss('state:change');
        });
      }
    ]);
})();
