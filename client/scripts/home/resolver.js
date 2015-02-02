(function() {
  'use strict';

  define([
    'home/module'
  ], function(home) {
    function DependenciesResolver($q) {
      var deferred = $q.defer();

      return deferred.promise;
    }

    return ['$q', DependenciesResolver];
  });
})(define, angular);
