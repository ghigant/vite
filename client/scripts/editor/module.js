(function(define, angular) {
  'use strict';

  define([
    'editor/config',
    'editor/router'
  ], function(config, Router) {
      var module = angular.module(config.name, [])
        .config([
          '$controllerProvider',
          '$provide',
          function($controllerProvider, $provide) {
            module.controller = $controllerProvider.register;
            module.service    = $provide.service;
          }
        ])
        .config(Router);

      return module;
  });

})(define, angular);
// (function() {
//   'use strict';
//   var config = {
//     views: '/scripts/editor/views'
//   };
//   angular.module('vite.editor', ['ui.router', 'ngAnimate'])
//     .constant('vite.editor.config', config)
//     .config([
//       '$stateProvider',
//       '$locationProvider',
//       function($stateProvider, $locationProvider) {
//         // $locationProvider.html5Mode(true);
//         // $locationProvider.hashPrefix('!');
//
//         $stateProvider.state('editor', {
//           url: '/editor',
//           abstract: true,
//           views: {
//             viewport: {
//               templateUrl: config.views + '/index.html',
//               // controller: 'vite.editor.UIEditorCtrl'
//             }
//           }
//         }).state('editor.home', {
//           url: '',
//         //  abstract: true,
//           views: {
//             toolbar: {
//               templateUrl: config.views + '/layout/tools.html'
//             },
//             aside: {
//               template: '<a href="/editor/structure"><h1>Aside 1</h1></a>'
//             },
//             content: {
//               templateUrl: config.views + '/layout/content.html',
//             }
//           }
//         })
//         .state('editor.home.structure', {
//           url: '/structure',
//           views: {
//             'aside@editor': {
//               template: '<a href="/editor"><h1>Aside 2</h1></a>'
//             }
//           }
//         })
//         .state('editor.home.preview', {
//           url: '/preview'
//         });
//       }
//     ]);
// })();
