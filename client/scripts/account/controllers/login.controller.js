(function() {
  'use strict';

  angular.module('vite.account')
    .controller('vite.account.LoginCtrl', [
      '$scope',
      '$location',
      '$window',
      'vite.shared.AuthService',
      function LoginCtrl($scope, $location, $window, AuthService) {
        $scope.user = {};

        $scope.login = function() {
          AuthService.login(angular.copy($scope.user), function(err) {
            if(!err) {
              $scope.closeModal();
              if($scope.isHomePage()) {
                $location.url('/editor');
              }
            }
            $scope.user = {};
          });
        }

        $scope.loginOauth = function(provider) {
          provider = provider || 'tumblr';
          $window.location.href = '/auth/' + provider;
        }
      }
    ])
})();
