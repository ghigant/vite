(function(window, head) {
  'use strict';

  head.js(
    { 'require':      './bower_components/requirejs/require.js', size: '83083'},
    { 'angular':      './bower_components/angular/angular.js', size: '789267'},
    { 'ui.router':    './bower_components/angular-ui-router/release/angular-ui-router.js', size: '156740'},
    { 'ui.bootstrap': './bower_components/angular-bootstrap/ui-bootstrap-tpls.js', size: '142792'}
  )
  .ready("ALL", function() {
    require.config({
      appDir: '',
      baseUrl: './scripts',
    });

    require( ['main'], function(app) {
      // Application has bootstrapped and started...
      console.log('Application has bootstrapped and started');
    });
  });


})(window, head);
