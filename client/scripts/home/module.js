(function() {
  'use strict';
  var config = {
    views: '/scripts/home/views'
  };
  angular.module('vite.home', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
    .constant('vite.home.config', config)
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('vite', {
            url: '',
            abstract: true,
            views: {
              'viewport@': {
                templateUrl: config.views + '/layout.html',
                controller: function() {
                  console.log('main app controller');
                }
              }
            }
          })
          .state('vite.home', {
            url: '/'
          })
          .state('vite.login', {
            url: '/login',
            onEnter: [
              '$state',
              '$modal',
              function($state, $modal) {
                $modal.open({
                  templateUrl: config.views + '/login.html',
                  windowTemplateUrl: config.views + '/modal/window.html',
                  backdrop: false,
                  animate: 'active',
                  controller: 'vite.home.LoginCtrl'
                });
                // console.log('vite.login');
                // console.log($state);
                // console.log($modal);
              }
            ]
          })
          .state('vite.register', {
            url: '/register',
            onEnter: function() {
              console.log('vite.register');
            }
          })
          .state('vite.forgot', {
            url: '/forgot',
            onEnter: function() {
              console.log('vite.forgot');
            }
          })
          .state('vite.tour', {
            url: '/tour',
            onEnter: function() {
              console.log('vite.tour');
            }
          });
      }
    ]);
})();
