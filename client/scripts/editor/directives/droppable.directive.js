(function(define) {
  'use strict';

  define([
    'editor/module',
    'editor/services/dragdropService',
    'dragdrop',
    'draggabilly',
  ],function(module) {
    module.directive('droppable', [
      module.name  +'.DragDropService',
      function droppableComponent(ddService) {
        return {
          restrict: 'A',
          link: function postLink($scope, $el, $attr) {
            console.log('droppable');
            $el.addClass('drop-area__item');
            var dom = $el[0];
            var droppable = new Droppable(dom, {
              onDrop : function( instance, draggableEl ) {
                console.log('onDrop');
                console.log(arguments);
              }
            });

            ddService.addDroppable(droppable);
          }
        }
      }
    ]);
  });
})(define);
