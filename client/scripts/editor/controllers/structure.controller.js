(function(define, angular) {
  'use strict';

  define([
    'editor/module'
  ], function(module) {
    module.controller(module.name + '.StructureCtrl', [
      '$scope',
      '$http',
      function StructureCtrl($scope, $http) {
        $scope.blogs = null;

        $http.get('/api/tumblr/info/blogs')
          .then(
            function successHandle(response) {
              $scope.blogs = response.data;
            },
            function failureHandle() {
            }
          );
      }
    ])
  });

})(define, angular);
