(function() {
  'use strcit';

  define([
    'editor/module'
  ], function(module) {
    module.service(module.name + '.Template', [
      function() {
        this.items = [];
      }
    ]);
  });
})(define, angular);
