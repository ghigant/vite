(function(define, require) {
  'use strict';

  define([
    'editor/config'
  ],
  function(config) {
    function EditorRouter($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('/editor', '/editor/');
      $stateProvider
        .state('editorBase', {
          url: '/editor',
          abstract: true,
          resolve: {
            loadDeps: [
              '$q',
              function($q) {
                var dfd = $q.defer();
                require([
                  'editor/controllers/uiEditor',
                  'editor/controllers/toolbar.controller'
                ], function() {
                  dfd.resolve();
                });

                return dfd.promise;
            }]
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
          url: '/'
        })
        .state('editor.structure', {
          url: '/structure',
          views: {
            'aside@editorBase': {
              templateUrl: config.views + '/aside/structure.html'
            }
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