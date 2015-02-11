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
})(define, angular);
