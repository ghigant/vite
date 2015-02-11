(function(window, head) {
  'use strict';

  head.js(
    { 'require':      './bower_components/requirejs/require.js', size: '83083'},
    { 'angular':      './bower_components/angular/angular.js', size: '789267'},
    { 'ngResource':   './bower_components/angular-resource/angular-resource.js', size: '24996'},
    { 'ngAnimate':    './bower_components/angular-animate/angular-animate.js', size: '77784'},
    { 'ngCookies':    './bower_components/angular-cookies/angular-cookies.js', size: '5824'},
    { 'ui.router':    './bower_components/angular-ui-router/release/angular-ui-router.js', size: '156740'},
    { 'ui.bootstrap': './bower_components/angular-bootstrap/ui-bootstrap-tpls.js', size: '142792'},
    { 'contenteditable': './bower_components/angular-contenteditable/angular-contenteditable.js', size:'2921' }
  )
  .ready("ALL", function() {
    require.config({
      appDir: '',
      baseUrl: './scripts',
      paths: {
        'draggabilly':        './../bower_components/draggabilly/dist/draggabilly.pkgd',
        'get-style-property': './../bower_components/get-style-property/get-style-property',
        'modernizr':          './../js/modernizr.custom',
        'classie':            './../bower_components/classie/classie',
        'dragdrop':           './../js/dragdrop'
      },
      shim: {
        dragdrop: {
          deps: ['modernizr', 'draggabilly', 'classie'],
          exports: 'dragdrop',
          init: function(modernizr, Draggabilly, classie) {
            window.Draggabilly  = Draggabilly;
            window.classie      = classie;
          }
        }
      }
    });

    require( ['main'], function(app) {
      // Application has bootstrapped and started...
      console.log('Application has bootstrapped and started');
    });
  });


})(window, head);
