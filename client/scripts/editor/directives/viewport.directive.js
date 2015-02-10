(function() {
  'use strict';

  define([
    'editor/module'
  ], function(module) {
    module.directive('viewport', [
        '$rootScope',
        function() {
          return {
            restrict: 'EA',
            link: function() {
              console.log('view port link');

            }
          }
        }
      ]
    );
  })
})(define, angular);
