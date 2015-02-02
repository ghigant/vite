(function(define, angular) {
  'use strict';

  define([
    'editor/module',
    'editor/config',
    'editor/services/uiService',
  ], function(module, config) {
    function UIEditorController($scope, $q, $http, ui) {
      var self = this;
      $scope.username = null;

      self._aside = null;
      self._modal = null;

      $scope.templates = {
        tools: config.views + '/layout/tools.html',
        content: config.views + '/layout/content.html'
      }
      $scope.tools = ui.tools;

      self._init = function() {
        angular.forEach($scope.tools, function(tool) {
          angular.extend(tool, {
            active: false
          });
        });
      }

      self._init();

      $scope.openAside = function(tool) {
        $scope.closeAside();
        if(tool && angular.isString(tool.aside)) {
          self._aside = $aside({
            scope: $scope,
            animation: 'cbp-spmenu-open',
            template: config.views + '/aside/main.html',
            content: tool.aside
          });

          self._aside.$promise.then(function() {
            self._aside.show();
          });
        }
      }

      $scope.closeAside = function() {
        if(self._aside) {
          self._aside.hide();
          self._aside = null;
        }
      }

      $scope.closeModal = function() {

      }

      $scope.openModal = function(template) {
        // console.log('$scope.openModal:', template);
        if(angular.isString(template)) {
          self._modal = $modal({
            scope: $scope,
            animation: 'active',
            backdropAnimation: 'acitve',
            template: template,
            show: false,
          });

          self._modal.$promise.then(self._modal.show);
        }
      }

      $scope.toolClick = function(index, item) {
        if(angular.isDefined(item.aside)) {
          $scope.openAside(item);
        } else if(angular.isDefined(item.modal)) {
          $scope.closeAside();
          $scope.openModal(item.modal);
        } else {
          $scope.closeAside();
        }
      }

      $scope.$on('$destroy', function() {
        $scope.closeAside();
      });


    }
    module
      .controller(module.name + '.UIEditorCtrl', [
        '$scope',
        '$q',
        '$http',
        module.name + '.UIService',
        UIEditorController
      ]);
  });


})(define, angular);
