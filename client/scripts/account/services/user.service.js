(function(define, angular) {
  'use strict';

  define([
    'account/module'
  ], function(module) {
    module.factory(module.name + '.UserService', [
      '$resource',
      function($resource) {
        return $resource('/api/users/:id/:controller', {
          id: '@_id'
        },{
          changePassword: {
            method: 'PUT',
            params: {
              controller:'password'
            }
          },
          get: {
            method: 'GET',
            params: {
              id:'me'
            }
          }
         });
      }
    ]);
  });
})(define, angular);
