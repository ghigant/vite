(function() {
  'use strict';

  angular.module('vite.editor')
    .service(
      'vite.editor.DragDropService',
      function DragDropService() {
        this.droppable = [];

        this.addDroppable = function(droppable) {
          droppable && this.droppable.push(droppable);
        }
      }
    );
})();
