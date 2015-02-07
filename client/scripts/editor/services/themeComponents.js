(function(define, angular) {
  'use strcit';

  define([
    'editor/module'
  ], function(module) {
    module.service(module.name + 'ThemeComponents', [
      function() {
        this.components = [{
          type: 'container',
          label: 'Container'
        },{
          type: 'list',
          label: 'List'
        }];
      }
    ])
  });
})(define, angular);
