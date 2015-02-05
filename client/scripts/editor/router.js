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
                    'editor/directives/droppable.directive'
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
              templateUrl: config.views + '/aside/structure.html'
            }
          },
          resolve: {
            loadDeps: [
              '$q',
              function($q) {
                var dfd = $q.defer();
                require([
                  'editor/directives/draggable.directive'
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
          }
        })
        .state('editor.preview', {
          url: '/preview',
          views: {
            'viewport@': {
              templateUrl: config.views + '/layout/preview.html'
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
