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
                  'editor/controllers/uiEditor'
                ], function() {
                  console.log('loaded editor deps');
                  dfd.resolve();
                });

                return dfd.promise;
            }]
          },
          views: {
            'viewport@': {
              templateUrl: config.views + '/index.html',
              controller: 'vite.editor.UIEditorCtrl'
            }
          }
        })
        .state('editor', {
          url: '/',
          parent: 'editorBase',
          views: {
            toolbar: {
              templateUrl: config.views + '/layout/tools.html'
            },
            aside: {
              template: '<a href="/editor/structure"><h1>Aside 1</h1></a>'
            },
            content: {
              templateUrl: config.views + '/layout/content.html',
            }
          }
        })
        .state('editor.preview', {
          url: '/preview',
          views: {
            'viewport@': {
              template: '<h1>Preview Page</h1>'
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
