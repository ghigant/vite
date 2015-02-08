(function(define) {
  'use strict';

  define([
    'editor/module',
    'editor/services/dragdropService',
    'dragdrop',
    'draggabilly'
  ],function(module) {
    module.directive('droppable', [
      '$compile',
      '$parse',
      module.name  +'.DragDropService',
      function droppableComponent($compile, $parse, ddService) {
        return {
          restrict: 'A',
          link: function postLink($scope, $el, $attr, ctrl) {
            $el.addClass('drop-area__item');

            var dom = $el[0];
            var droppable = new Droppable(dom, {
              onDrop : function( instance, draggable ) {
                var $draggable = angular.element(draggable);

                var type = $draggable.attr('data-type');
                if(['container'].indexOf(type) !== -1) {
                  $el = $el.append(
                    $compile(angular.element('<'+type+'></'+type+'>'))($scope)
                  );
                }
              }
            });

            ddService.addDroppable(droppable);
          }
        }
      }
    ]);
  });
})(define);
