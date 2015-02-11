(function(define, require) {
  'use strict';

  define([
    'editor/config',
    'account/module',
    'account/services/auth.service'
  ],
  function(config, account) {
    function EditorRouter($stateProvider, $urlRouterProvider) {
      // $urlRouterProvider.when('/editor', '/editor/');
      $stateProvider
        .state('editorBase', {
          url: '/editor',
          abstract: true,
          resolve: {
            loadDeps: [
              '$q',
              function($q) {
                var dfd = $q.defer();
                require(['get-style-property'], function(getStyleProperty) {
                  window.getStyleProperty = getStyleProperty;
                  require([
                    'dragdrop',
                    'editor/controllers/uiEditor',
                    'editor/controllers/toolbar.controller',
                    'editor/directives/droppable.directive',
                    'editor/services/structure.service',
                    // 'editor/directives/viewport.directive'
                  ], function() {
                    dfd.resolve();
                  });
                });
                return dfd.promise;
            }],
            auth: [
              '$q',
              '$location',
              account.name + '.AuthService',
              function($q, $location, AuthSrvice) {
                var dfd = $q.defer();
                AuthSrvice.isLoggedInAsync(function(isAuth) {
                  if(!isAuth) {
                    dfd.reslove(isAuth);
                    $location.path('/login');
                  } else {
                    dfd.resolve(isAuth);
                  }
                });
                return dfd.promise;
              }
            ]
          },
          views: {
            'viewport@': {
              templateUrl:  config.views + '/index.html',
              controller:   config.name + '.UIEditorCtrl'
            }
          }
        })
        .state('editor', {
          url: '',
          abstract: true,
          parent: 'editorBase',
          views: {
            toolbar: {
              templateUrl: config.views + '/layout/tools.html',
              controller: config.name + '.UIToolsCtrl'
            },
            content: {
              templateUrl: config.views + '/layout/content.html',
              controller: [
                '$scope',
                '$http',
                '$state',
                function EditorController($scope, $http, $state) {
                  $scope.structure = [];
                  $scope.save = function(){
                    console.log($scope.structure);

                    $http.post('/api/template/save', angular.copy(
                      $scope.structure
                    )).then(
                      function successHandle() {
                        console.log('success save action');
                        console.log(arguments);
                        $state.go('editor.preview', {
                          id: '54d4c988869af3620a66a061'
                        });
                      }
                    );
                  }

                }
              ]
            }
          }
        })
        .state('editor.index', {
          url: ''
        })
        .state('editor.structure', {
          url: '/structure',
          views: {
            'aside@editorBase': {
              templateUrl: config.views + '/aside/structure.html',
              controller: config.name + '.StructureCtrl'
            }
          },
          resolve: {
            loadDeps: [
              '$q',
              function($q) {
                var dfd = $q.defer();
                require([
                  'editor/controllers/structure.controller'
                ], function() {
                  dfd.resolve();
                });

                return dfd.promise;
              }
            ]
          }
        })
        .state('editor.components', {
          url: '/components',
          views: {
            'aside@editorBase': {
              templateUrl: config.views + '/aside/components.html'
            }
          },
          resolve: {
            loadDeps: [
              '$q',
              function($q) {
                var deferred = $q.defer();
                require([
                  'editor/directives/draggable.directive',
                  'editor/directives/container.directive',
                  'editor/directives/description.directive',
                  'editor/directives/title.directive',
                  'editor/services/themeComponents'
                ], function() {
                  deferred.resolve(arguments);
                });

                return deferred.promise;
              }
            ]
          }
        })
        .state('editor.preview', {
          url: '/preview/:id',
          views: {
            'viewport@': {
              templateUrl: config.views + '/layout/preview.html',
              controller: [
                '$scope',
                '$location',
                '$stateParams',
                function($scope, $location, $stateParams) {
                  $scope.previewUrl = 'http://' + $location.host() +
                    ($location.port() ? ':' + $location.port() : '' ) +
                    '/api/template/preview/' + $stateParams.id;
                }
              ]
            }
          }
        });
    }

    return [
      '$stateProvider',
      '$urlRouterProvider',
      EditorRouter];
  });

})(define, require);
