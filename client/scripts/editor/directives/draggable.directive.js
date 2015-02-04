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
      module.name + '.DragDropService',
      function draggableComponent($document, ddService) {
        return {
          restrict: 'A',
          link: function postLink($scope, $el) {
            $el.removeAttr('draggable');
            var draggable = new Draggable($el[0], ddService.droppable, {
              // helper: true,
              onStart: function() {
                console.log('drag.start');
              },
              onEnd: function(wasDropped) {
                console.log('drag.end', 'dropped:', wasDropped);
              }
            });
          }
        }
      }
    ]);
  });

})(define);
