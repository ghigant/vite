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
          template: '<h1 draggable ng-style="structure.style">{{structure.text}}</h1>',
          link: function postLink($scope, $el, $attr) {

            $scope.structure.type = 'h1';
            $scope.structure.textVar = 'Title';
            $scope.structure.text = 'Blog Title';

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
                  $scope.structure.text = blog.title || $scope.structure.text;
                }
              )
          }
        }
      }
    ]);
  });
})(define ,angular);
