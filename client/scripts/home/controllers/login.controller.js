(function() {
  'use strict';

  function LoginCtrl($scope, $state, $modalInstance) {
    $scope.login = function() {
      
    }

    $scope.$on('$stateChangeStart', function($event) {
      $modalInstance.dismiss('state:change');
    });
  }

  return [
    '$scope',
    '$state',
    '$modalInstance',
    LoginCtrl
  ];

})();
