(function() {
  'use strict';

  function EditorCtrl($scope, $q, $aside, cfg) {
    var self = this;

    self.asideVisible = false;

    var aside = null;

    $scope.menu = [{
      icon: 'fa-eye'
    },{
      icon: 'fa-edit'
    },{
      icon: 'fa-plus-square-o'
    }];

    self.getAsideTemplate = function(icon) {
      var template = null;
      switch(icon) {
        case 'fa-eye':
          template = cfg.views + '/aside.html'
          break;
        case 'fa-edit':
          // template = cfg.views + '/aside.html'
          break;
        case 'fa-plus-square-o':
          // template = cfg.views + '/aside.html'
          break;
      }

      return template;
    }

    self.doShow = function(icon) {
      var defered = $q.defer(),
        template = self.getAsideTemplate(icon);

      if(template) {
        aside = $aside({
          scope: $scope,
          template: template,
          show: false
        });

        aside.$promise.then(function() {
          aside.show();
          defered.resolve();
        });
      } else {
        defered.resolve();
      }

      return defered.promise;
    }

    self.doHide = function() {
      var defered = $q.defer();

      if(aside && aside.$promise) {
        aside.$promise.then(function() {
          aside.hide();
          aside = null;
          defered.resolve();
        });
      } else {
        defered.resolve();
      }

      return defered.promise;
    }

    self.showAsideMenu = function(icon) {
      var defered = $q.defer();

      self.doHide().then(function() {
        self.doShow(icon).then(function() {
          defered.resolve();
        });
      });

      return defered.promise;
    }

    $scope.select = function(icon) {
      self.showAsideMenu(icon);
    }
  }

  angular.module('vite.editor')
    .controller('vite.editor.MainCtrl', [
      '$scope',
      '$q',
      '$aside',
      'vite.editor.config',
      EditorCtrl
    ]);
})();
