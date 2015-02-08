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
          scope:{},
          replace: true,
          template: '<h1 draggable ng-style="style">{{title}}</h1>',
          link: function postLink($scope, $el, $attr) {
            $scope.title = 'Blog Title';

            $scope.style = {
              'color': '#000',
              'text-align': 'left',
              'width': '300px',
              'padding': '10px'
            };

            $http.get('/api/tumblr/info/blogs')
              .then(
                function successHandle(response) {
                  var blog = response.data[0];
                  $scope.title = blog.title;
                }
              )
          }
        }
      }
    ]);
  });
})(define ,angular);
