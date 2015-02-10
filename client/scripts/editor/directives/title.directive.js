(function(define, angular) {
  'use strict';

  define([
    'editor/module'
  ], function(module) {
    module.directive('blogTitle', [
      '$http',
      function($http){
        return {
          restrict: 'EA',
          scope:{
            structure: '='
          },
          replace: true,
          template: '<h1 draggable ng-style="structure.style">{{structure.title}}</h1>',
          link: function postLink($scope, $el, $attr) {
            $scope.structure.title = 'Blog Title';

            $scope.structure.style = {
              'color': '#000',
              'text-align': 'left',
              'width': '300px',
              'padding': '10px'
            };

            $http.get('/api/tumblr/info/blogs')
              .then(
                function successHandle(response) {
                  var blog = response.data[0];
                  $scope.structure.title = blog.title || $scope.structure.title;
                }
              )
          }
        }
      }
    ]);
  });
})(define ,angular);
