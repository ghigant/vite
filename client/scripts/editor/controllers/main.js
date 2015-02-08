(function() {
  'use strict';

  define([
    'editor/config'
  ], function(Config) {
    function MainEditorController($scope) {
      console.log('main editor controller');
    }

    return ['$scope', MainEditorController];
  });

  // function MainController($scope, $q, $aside, cfg) {
  //   var self = this;
  //
  //   $scope.activeItem = null;
  //
  //   $scope.templates = {
  //     tools: cfg.views + '/tools.html',
  //     asside: cfg.views + '/aside/main.html'
  //   }
  //   $scope.tools = [{
  //     icon: 'icon-eye',
  //     text: 'view'
  //   },{
  //     icon: 'icon-plus',
  //     template: cfg.views + '/aside/content.html',
  //     text: 'add pages'
  //   },{
  //     icon: 'icon-trash',
  //     text: 'trash'
  //   },{
  //     icon: 'icon-download',
  //     text: 'download'
  //   },{
  //     icon: 'icon-share',
  //     text: 'share'
  //   }, {
  //     icon: 'icon-help',
  //     text: 'help'
  //   }];
  //
  //   self._init = function() {
  //     angular.forEach($scope.tools, function(tool) {
  //       angular.extend(tool, {
  //         active: false,
  //         template: tool.template || ''
  //       });
  //     });
  //   }
  //
  //   $scope.toolClick = function(index) {
  //     if(self.activeItem) {
  //       $scope.activeItem.active = false;
  //     }
  //     $scope.tools[index].active = true;
  //     $scope.activeItem = $scope.tools[index];
  //     console.log($scope.activeItem);
  //   }
  //
  //   self._init();
  // }
  //
  // angular.module('vite.editor')
  //   .controller('vite.editor.MainCtrl', [
  //     '$scope',
  //     '$q',
  //     '$aside',
  //     'vite.editor.config',
  //     MainController
  //   ]);
})(define, angular);
