(function(define) {
  'use strict';

  define([
    'editor/module',
    'editor/services/dragdropService',
    'dragdrop',
    'draggabilly'
  ],function(module) {

    Droppable.prototype.isActive = false;

    Droppable.prototype.hasParent = function() {
      var parent = this.el.parentNode;
      var i = 0;
      var attrs = null;
      while(parent && parent.nodeName.toLowerCase() !== 'body') {
        if(parent.hasAttribute('droppable')) {
          classie.remove( parent, 'highlight' );
          classie.remove( parent,  'is-active');
          i++;
        }
        parent = parent.parentNode;
      }
      return i !== 0;
    }

    // highlight the droppable if it's ready to collect the draggable
    Droppable.prototype.highlight = function( draggableEl ) {
      if( this.isDroppable( draggableEl ) ) {
        classie.add( this.el, 'highlight' );
        classie.add( this.el, 'is-active' );
        this.hasParent();
      }
      else {
        classie.remove( this.el, 'highlight' );
        classie.remove( this.el, 'is-active');
      }
    }


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
                var $draggable = angular.element(draggable),
                    type = $draggable.attr('data-type'),
                    isActive = $el.hasClass('is-active');

                $draggable.removeClass('is-active');

                if(isActive && [
                  'container',
                  'block-description',
                  'blog-title'].indexOf(type) !== -1) {
                  $scope.$apply(function() {
                    $el = $el.append(
                      $compile(angular.element('<'+type+'></'+type+'>'))($scope)
                    );
                  });
                }
              }
            });

            // $el.on('mouseover', function(event) {
            //   // event.preventDefault();
            //   // event.stopPropagation();
            //   console.log('mouseover');
            //   ddService.activeDroppable = droppable;
            // }).on('mouseenter', function() {
            //   console.log('mouse enter');
            // }).on('mouseleave', function() {
            //   console.log('mouse leave');
            // });

            ddService.addDroppable(droppable);
          }
        }
      }
    ]);
  });
})(define);
