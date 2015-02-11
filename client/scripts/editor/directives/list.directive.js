(function() {
  'use strict';
  define(['editor/module'], function(module) {
    module.directive('list', [
      function() {
        return {
          restrict: 'EA',
          scope: {
            structure: '='
          },
          template: [
            '<ul>',
              '<li ng-repeat="item in items" contenteditable="true" ng-model="item.text"></li>',
            '</ul>'
          ].join(''),
          link: function($scope, $el, $attrs) {
            $scope.items = [{
              text: 'Item 1'
            },{
              text: 'Item 2'
            },{
              text: 'Item 3'
            },{
              text: 'Item 4'
            }];
          }
        }
      }
    ]);
  });
})(define)
