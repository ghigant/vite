(function() {
  'use strict';

  angular.module('vite.editor')
    .directive('droppable', [
      'vite.editor.DragDropService',
      function(ddService) {
        return {
          restrict: 'A',
          link: function postLink($scope, $el, $attr) {
            console.log('droppable');
            $el.addClass('drop-area__item');
            var dom = $el[0];
            var droppable = new Droppable(dom, {
              onDrop : function( instance, draggableEl ) {
              }
            });

            ddService.addDroppable(droppable);
          }
        }
      }
    ]);
})();
