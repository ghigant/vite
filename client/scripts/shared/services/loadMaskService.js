(function() {
  'use strict';

  angular.module('vite.shared')
    .provider('$lmProvider', [
      function() {
        this.$get = function() {

          return {
            show: function() {

            },
            hide: function() {

            }
          }
        }
      }
    ]);
})();
