(function(define) {
  'use strict';

  define([
    'account/module',
    'account/services/auth.service'
  ], function(module){
    function LoginCtrl($scope, $state, $modalInstance, $location, $window, AuthService) {
      $scope.user = {};
      $scope.login = function() {
        AuthService.login(angular.copy($scope.user), function(err) {
          if(!err) {
            $modalInstance.close(true);
          }
          $scope.user = {};
        });
      }

      $scope.loginOauth = function(provider) {
        provider = provider || 'tumblr';
        $window.location.href = '/auth/' + provider;
      }

      $scope.$on('$stateChangeStart', function($event) {
        $modalInstance.dismiss('state:change');
      });
    }

    return [
      '$scope',
      '$state',
      '$modalInstance',
      '$location',
      '$window',
      module.name + '.AuthService',
      LoginCtrl
    ];
  });

})(define);
