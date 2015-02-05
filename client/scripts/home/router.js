(function(define, angular) {
  'use strict';

  define([
    'home/config',
    'home/controllers/login',
    'home/controllers/register',
  ], function(config, LoginCtrl, RegisterCtrl) {
    function HomeRouter($stateProvider) {
      $stateProvider
        .state('vite', {
          url: '',
          abstract: true,
          views: {
            'viewport@': {
              templateUrl: config.views + '/layout.html'
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
                backdropClass: 'bg-overlay',
                controller: LoginCtrl
              })
              .result.catch(function(reason) {
                if(reason !== 'state:change') {
                  $state.go('editor.index');
                }
              });
            }
          ]
        })
        .state('vite.register', {
          url: '/register',
          onEnter: [
            '$state',
            '$modal',
            function($state, $modal) {
              $modal.open({
                templateUrl: config.views + '/register.html',
                windowTemplateUrl: config.views + '/modal/window.html',
                backdropClass: 'bg-overlay',
                controller: RegisterCtrl
              })
              .result
                .then(function() {

                })
                .catch(function(reason) {
                  if(reason !== 'state:change') {
                    $state.go('vite.home');
                  }
                });
            }
          ]
        });
    }
    return ['$stateProvider', HomeRouter];
  });
})(define, angular);
