(function() {
  'use strict';

  define([
    'editor/module',
    'editor/services/uiService',
  ], function(module) {
    function UIToolsController($scope, $state, UIService) {
      $scope.go = function(stateName) {
        stateName = stateName || 'editor.index'
        stateName && $state.go(stateName);
      }
      $scope.$root.asideOpen = true;
    }

    module.controller(module.name + '.UIToolsCtrl',[
        '$scope',
        '$state',
        module.name + '.UIService',
        UIToolsController
      ]);
  });

})(define);
