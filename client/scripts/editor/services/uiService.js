(function(define) {
  'use strict';
  define([
    'editor/module',
    'editor/config'
  ],function(module, config) {
    function UIService() {
      this.tools = [{
        icon: 'icon-eye',
        text: 'view',
        state: 'editor.preview'
      },{
        icon: 'icon-plus',
        text: 'add pages',
        state: 'editor.structure'
      },{
        icon: 'icon-edit',
        text: 'edit',
        state: 'editor.components'
      },{
        icon: 'icon-trash',
        text: 'trash'
      },{
        icon: 'icon-download',
        text: 'download'
      },{
        icon: 'icon-share',
        text: 'share',
        modal: config.views + '/modals/share.html'
      }, {
        icon: 'icon-help',
        text: 'help'
      }];
    }

    module.service(module.name + '.UIService', UIService);
  });
})(define);
