(function() {
  'use strict';

  angular.module('vite.home')
    .controller('vite.home.RegisterCtrl', [
      '$scope',
      '$state',
      '$modalInstance',
      function RegisterCtrl($scope, $state, $modalInstance) {

        $scope.$on('$stateChangeStart', function() {
          $modalInstance.dismiss('state:change');
        });
      }
    ]);
})();
