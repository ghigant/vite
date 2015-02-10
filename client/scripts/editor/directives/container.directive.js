(function(define, angular) {
  'use strcit';

  define([
    'editor/module',
    'editor/config'
  ], function(editor, config) {
    editor.directive('container', [
      function() {
        return {
          restrict: 'EA',
          replace: true,
          scope: {
            structure: '=structure'
          },
          template: [
            '<div class="row" draggable>',
              '<div ng-repeat="row in rows" ng-class="row.class" droppable data-structure="structure[$index].items"></div>',
            '</div>'
          ].join(''),
          link: function($scope, $el, $attrs, $ctrl) {
            // structure
            // console.log('container');
            // console.log($scope.structure);
            $ctrl._render = function(cols) {
              var rows = [];
              for(var i = 0; i < cols; i++) {
                var className = 'col-' + Math.abs(4 - cols);
                rows.push({
                  class: className
                });

                $scope.structure.push({
                  type: 'div',
                  class: className,
                  items: []
                });

              }
              $scope.rows = rows;
            }
            $scope.render();
          },
          controller: [
            '$scope',
            '$modal',
            function($scope, $modal) {
              var self = this;
              $scope.rows = [];
              $scope._render = angular.noop;

              $scope.render = function(cols) {
                if(angular.isNumber(cols)) {
                  $scope._render(cols);
                } else {
                  self._beforeDrop();
                }
              };

              self._beforeDrop = function() {
                $modal.open({
                  templateUrl: config.views + '/dnd/container.html',
                  windowTemplateUrl: 'scripts/home/views/modal/window.html',
                  backdropClass: 'bg-overlay',
                  controller: function($scope, $modalInstance) {
                    $scope.select = function(columns) {
                      $modalInstance.close(columns);
                    }
                  }
                })
                .result.then(function(cols) {
                  self._render(cols);
                });
              }
            }
          ]
        }
      }
    ]);
  });

})(define, angular);
