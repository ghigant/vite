(function() {
  'use strict';

  function UIEditorController($scope, $q, $aside, $modal, cfg) {
    var self = this;


    self._aside = null;
    self._modal = null;

    $scope.templates = {
      tools: cfg.views + '/layout/tools.html',
      content: cfg.views + '/layout/content.html'
    }

    $scope.tools = [{
      icon: 'icon-eye',
      text: 'view'
    },{
      icon: 'icon-plus',
      aside: cfg.views + '/aside/structure.html',
      text: 'add pages'
    },{
      icon: 'icon-edit',
      aside: cfg.views + '/aside/edit.html',
      text: 'edit'
    },{
      icon: 'icon-trash',
      text: 'trash',
      modal: cfg.views + '/modals/delete.html'
    },{
      icon: 'icon-download',
      text: 'download'
    },{
      icon: 'icon-share',
      text: 'share',
      modal: cfg.views + '/modals/share.html'
    }, {
      icon: 'icon-help',
      text: 'help'
    }];

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
          template: cfg.views + '/aside/main.html',
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
      console.log('$scope.openModal:', template);
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
  }

  angular.module('vite.editor')
    .controller('vite.editor.UIEditorCtrl', [
      '$scope',
      '$q',
      '$aside',
      '$modal',
      'vite.editor.config',
      UIEditorController
    ]);
})();
