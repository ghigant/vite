(function(define) {
  'use strcit';

  define(['editor/module'], function(module) {
    module.directive('heading', [
      function() {
        return {
          restrict: 'EA',
          scope: {
            structure: '='
          },
          template: '<h1 contenteditable="true" ng-model="content" strip-br="true" select-non-editable="false">{{content}}</h1>',
          link: function($scope, $el, $attr) {
            $scope.content = 'Heading 1'
          }
        }
      }
    ]);
  });
})(define);
