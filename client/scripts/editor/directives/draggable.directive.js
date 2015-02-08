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

            var disableAll = function (skip) {
              angular.forEach(ddService.draggable, function(dragItem) {
                !dragItem.draggie.isDragging && dragItem.draggie.disable();
              });
              skip.draggie.enable();
            };

            var draggable = new Draggable($el[0], ddService.droppable, {
              // helper: true,
              onStart: function() {
                
              },
              onEnd: function(wasDropped) {
                // $rootScope.$apply(function() {
                //   $rootScope.asideOpen = true;
                // });
                // console.log('drag.stop:', wasDropped);
                // console.log($el[0]);
              }
            });

            draggable.draggie.disable();
            ddService.draggable.push(draggable);

            $el.on('mouseover', function(event) {
              event.preventDefault();
              event.stopPropagation();

              disableAll(draggable);
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
