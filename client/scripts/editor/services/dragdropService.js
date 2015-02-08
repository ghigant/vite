(function(define) {
  'use strict';

  define([
    'editor/module'
  ],function(module) {
    module.service(
      module.name + '.DragDropService',
      function DragDropService() {
        this.droppable = [];
        this.activeDroppable = null;

        this.draggable = [];

        this.addDroppable = function(droppable) {
          droppable && this.droppable.push(droppable);
        }
      }
    );
  });
})(define);
