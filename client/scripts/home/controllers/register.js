(function(define) {
  'use strict';

  define(function() {
    function RegisterCtrl($scope, $state, $modalInstance) {
      $scope.register = function() {
        
      }
      $scope.$on('$stateChangeStart', function() {
        $modalInstance.dismiss('state:change');
      });
    }

    return [
      '$scope',
      '$state',
      '$modalInstance',
      RegisterCtrl
    ];
  });

})(define);
