(function(define) {
  'use strict';

  define([
    'editor/module',
    'editor/services/dragdropService',
    'dragdrop',
    'draggabilly',
  ],function(module, service, dnd) {
    module.directive('draggable', [
      '$document',
      '$rootScope',
      module.name + '.DragDropService',
      function draggableComponent($document, $rootScope, ddService) {
        return {
          restrict: 'A',
          link: function postLink($scope, $el) {
            $el.addClass('draggable');
            var draggable = new Draggable($el[0], ddService.droppable, {
              //helper: true,
              onStart: function() {
                console.log('drag.start');
                console.log(arguments);
                $rootScope.$apply(function() {
                  $rootScope.asideOpen = false;
                });

              },
              onEnd: function(wasDropped) {
                $rootScope.$apply(function() {
                  $rootScope.asideOpen = true;
                });
                console.log('drag.stop:', wasDropped);
                console.log($el[0]);
              }
            });
            $scope.test = function() {
              console.log('test');
            }
          }
        }
      }
    ]);
  });

})(define);
