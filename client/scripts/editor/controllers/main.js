(function() {
  'use strict';

  function MainController($scope, $q, $aside, cfg) {
    var self = this;

    $scope.activeItem = null;

    $scope.templates = {
      tools: cfg.views + '/tools.html',
      asside: cfg.views + '/aside/main.html'
    }
    $scope.tools = [{
      icon: 'icon-eye',
      text: 'view'
    },{
      icon: 'icon-plus',
      template: cfg.views + '/aside/content.html',
      text: 'add pages'
    },{
      icon: 'icon-trash',
      text: 'trash'
    },{
      icon: 'icon-download',
      text: 'download'
    },{
      icon: 'icon-share',
      text: 'share'
    }, {
      icon: 'icon-help',
      text: 'help'
    }];

    self._init = function() {
      angular.forEach($scope.tools, function(tool) {
        angular.extend(tool, {
          active: false,
          template: tool.template || ''
        });
      });
    }

    $scope.toolClick = function(index) {
      if(self.activeItem) {
        $scope.activeItem.active = false;
      }
      $scope.tools[index].active = true;
      $scope.activeItem = $scope.tools[index];
      console.log($scope.activeItem);
  }

    self._init();

    // self.getAsideTemplate = function(icon) {
    //   var template = null;
    //   switch(icon) {
    //     case 'icon-eye':
    //       template = cfg.views + '/aside.html'
    //       break;
    //     case 'fa-edit':
    //       //  template = cfg.views + '/aside.html'
    //       break;
    //     case 'fa-plus-square-o':
    //       // template = cfg.views + '/aside.html'
    //       break;
    //     default:
    //       // template = cfg.views + '/aside.html'
    //       break;
    //   }
    //
    //   return template;
    // }
    //
    // self.doShow = function(icon) {
    //   var defered = $q.defer(),
    //     template = self.getAsideTemplate(icon);
    //
    //   if(template) {
    //     aside = $aside({
    //       scope: $scope,
    //       animation: 'cbp-spmenu-open',
    //       template: template,
    //       backdrop: 'cbp-spmenu-left',
    //       show: false
    //     });
    //
    //     aside.$promise.then(function() {
    //       aside.show();
    //       defered.resolve();
    //     });
    //   } else {
    //     defered.resolve();
    //   }
    //
    //   return defered.promise;
    // }
    //
    // self.doHide = function() {
    //   var defered = $q.defer();
    //
    //   if(aside && aside.$promise) {
    //     aside.$promise.then(function() {
    //       aside.hide();
    //       aside = null;
    //       defered.resolve();
    //     });
    //   } else {
    //     defered.resolve();
    //   }
    //
    //   return defered.promise;
    // }
    //
    // self.showAsideMenu = function(icon) {
    //   var defered = $q.defer();
    //
    //   self.doHide().then(function() {
    //     self.doShow(icon).then(function() {
    //       defered.resolve();
    //     });
    //   });
    //
    //   return defered.promise;
    // }
    //
    // $scope.select = function(icon) {
    //   console.log('icon', icon);
    //   // self.showAsideMenu(icon);
    // }
  }

  angular.module('vite.editor')
    .controller('vite.editor.MainCtrl', [
      '$scope',
      '$q',
      '$aside',
      'vite.editor.config',
      MainController
    ]);
})();
