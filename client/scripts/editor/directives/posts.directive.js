(function(define) {
  'use strict';

  define([
    'editor/module'
  ], function(module) {
    module.directive('blockPosts', [
      function() {
        return {
          restrict: 'EA',
          scope: {
            structure: '='
          },
          template: [
            '<ul ng-style="structure.style" class="posts">',
              '<li class="post" ng-class="post.type" ng-repeat="post in postsType">',
                '<h2>{{post.title}}</h2>',
                '<p>{{post.body}}</p>',
              '<li>',
            '<ul>'
          ].join(''),
          link: function($scope, $el, $attrs) {
            console.log('posts directive');
            console.log($scope.structure);

            $scope.structure.style = {
              'text-align': 'left',
              'color': '#000',
              'list-style': 'none'
            };

            $scope.postsType = [{
              type: 'text',
              title: 'Text title',
              body: 'Demo text tumblr post',
            }];
          }
        };
      }
    ]);
  });
})(define)
