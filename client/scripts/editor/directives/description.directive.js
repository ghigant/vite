(function(define, angular) {
  define([
    'editor/module'
  ], function(module) {
    module.directive('blockDescription', [
      '$http',
      function($http) {
        return {
          restrict: 'AE',
          scope: {},
          template: '<p draggable>{{description}}</p>',
          replace:true,
          link: function postLink($scope, $el, $attr) {
            $scope.description = 'Blog Description'
          },
          controller: [
            '$scope',
            '$http',
            function($scope, $http) {
              $http.get('/api/tumblr/info/blogs')
                .then(
                  function successHandle(response) {
                    var blog = response.data[0];
                    $scope.description = blog.description || $scope.description;
                  }
                );
            }
          ]
        }
      }
    ]);
  });
})(define, angular);
