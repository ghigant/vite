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
          scope: {},
          template: [
            '<div class="row" draggable>',
              '<div ng-repeat="row in rows" ng-class="row.class" droppable></div>',
            '</div>'
          ].join(''),
          link: function($scope, $el, $attrs, $ctrl) {
            // console.log($el);
            $ctrl._render = function(cols) {
              var rows = [];
              for(var i = 0; i < cols; i++) {
                rows.push({
                  class: 'col-' + Math.abs(4 - cols)
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
