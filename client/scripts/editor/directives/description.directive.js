(function(define, angular) {
  define([
    'editor/module'
  ], function(module) {
    module.directive('blockDescription', [
      '$http',
      function($http) {
        return {
          restrict: 'AE',
          scope: {
            structure: '='
          },
          template: '<p draggable ng-style="structure.style">{{structure.text}}</p>',
          replace: true,
          link: function postLink($scope, $el, $attr) {
            $scope.structure.text = 'Blog Description'
            $scope.structure.style = {
              'font-size' : '20px'
            }
          },
          controller: [
            '$scope',
            '$http',
            function($scope, $http) {
              $http.get('/api/tumblr/info/blogs')
                .then(
                  function successHandle(response) {
                    var blog = response.data[0];
                    $scope.structure.text = blog.description || $scope.structure.description;
                  }
                );
            }
          ]
        }
      }
    ]);
  });
})(define, angular);
