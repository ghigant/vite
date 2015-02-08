(function() {
  'use strict';

  function MainAppController($scope, $location, $modal, AuthService) {
    var self = this;

    self.modal = null;

    $scope.isHomePage = function() {
      return $location.url() === '/';
    }

    $scope.modal = function(module) {
      var parts = module.split('.');

      if(parts < 2 || self.modal) {
        return;
      }

      var modalPath = '/scripts/'  + parts[0] +  '/views/modals/' + parts[1] + '.html';

      self.modal = $modal({
        scope: $scope,
        // animation: 'active',
        // backdropAnimation: 'acttve',
        template: modalPath,
        show: false,
      });

      self.modal.$promise.then(self.modal.show);

    }

    $scope.closeModal = function() {
      self.modal.hide();
      self.modal = null;
    };

    $scope.login = function() {
      $scope.modal('account.login');
    }

    $scope.logout = function(){
      AuthService.logout();
      $location.url('/');
    }

  }

  angular.module('vite.shared')
    .controller('vite.shared.MainAppCtrl', [
      '$scope',
      '$location',
      '$modal',
      'vite.shared.AuthService',
      MainAppController
    ]);

})();
