(function() {
  'use strict';
  function MainCtrl($scope, $modal, config) {
    var self = this;

    self._modal = null;

    self._doOpen = function(tpl) {
      self._modal = $modal({
        scope: $scope,
        animation: 'active',
        backdropAnimation: 'acitve',
        template: config.views + '/' + tpl + '.html',
        show: false,
      });
      
      self._modal.$promise.then(self._modal.show);
    }

    $scope.openModal = function(type) {
      if(['login', 'register', 'tour'].indexOf(type) === -1) {
        return;
      }
      if(self._modal) {
        self._modal.hide();
        self._modal = null;
      }
      self._doOpen(type);
    }

    $scope.closeModal = function() {
      self._modal.hide();
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
