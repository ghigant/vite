(function() {
  'use strict';

  function EditorCtrl($scope, $aside, cfg) {
    console.log('Editor Main Ctrl');
    var self = this;
    self.aside = $aside({
      scope: $scope,
      template: cfg.views + '/asside.html'
    });

    self.aside.$promise.then(function() {
      self.aside.show();
    });
  }

  angular.module('vite.editor')
    .controller('vite.editor.MainCtrl', [
      '$scope',
      '$aside',
      'vite.editor.config',
      EditorCtrl
    ]);
})();
