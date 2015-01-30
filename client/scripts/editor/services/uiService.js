(function() {
  'use strict';

  angular.module('vite.editor')
    .service('vite.editor.uiService', [
      'vite.editor.config',
      function uiService(cfg) {
        // editor tools
        this.tools = [{
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
      }
    ]);
})();
