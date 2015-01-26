(function() {
  'use strict';

  angular.module('vite.editor')
    .directive('draggable', [
      '$document',
      'vite.editor.DragDropService',
      function draggableComponent($document, ddService) {
        return {
          restrict: 'A',
          link: function($scope, $el, $attr) {
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
        };
      }
    ])
})();
