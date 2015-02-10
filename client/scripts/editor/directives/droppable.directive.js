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
      module.name  +'.Template',
      function droppableComponent($compile, $parse, ddService, template) {
        return {
          restrict: 'A',
          scope: {
            structure: '='
          },
          link: function postLink($scope, $el, $attr, ctrl) {
            // console.log($scope.structure);
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

                    var index = $scope.structure.push((function(type) {
                      var structure = {
                        type: 'div'
                      };

                      if(type === 'container') {
                        angular.extend(structure, {
                          class: 'row',
                          items: []
                        });
                      } else if(type === 'blog-title') {
                        angular.extend(structure, {
                          type: 'h1',
                          class: 'blog-title'
                        });
                      } else if(type === 'block-description') {
                        angular.extend(structure, {
                          type: 'p',
                          class: 'block-description'
                        });
                      }

                      return structure;

                    })(type));

                    // $scope.items = $scope.items || [];
                    // $scope.items[index - 1] = [];
                    var newEl = angular.element('<'+type+'></'+type+'>');

                    newEl.attr('data-structure', (function(type) {
                      if(type === 'container') {
                        return 'structure['+ (index - 1) +'].items';
                      } else {
                        return 'structure['+ (index - 1) +']'
                      }
                    })(type));


                    $el = $el.append(
                      $compile(newEl)($scope)
                    );
                  });

                  // console.log($scope.structure);
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
