(function() {
  'use strict';
  function MainCtrl($scope, $modal, config) {
    var self = this;

    self._modal = null;

    var modal = $modal({
      scope: $scope,
      contentTemplate: config.views + '/register.html',
      show: false,
    });

    $scope.openRegister = function() {
      modal.$promise.then(modal.show);
    }

    self._doOpen = function(tpl) {
      self._modal = $modal({
        scope: $scope,
        contentTemplate: config.views + '/' + tpl + '.html',
        show: false,
      });

      modal.$promise.then(modal.show);
    }

    $scope.openModal = function(type) {
      if(['login', 'register'].indexOf(type) === -1) {
        return;
      }
      !self._modal && self._doOpen(type);
    }

    $scope.closeModal = function() {
      modal.hide();
      self._modal = null;
    }
  }

  angular.module('vite.home')
    .controller('vite.home.MainCtrl', [
      '$scope',
      '$modal',
      'vite.home.config',
      MainCtrl
    ]);
})();
