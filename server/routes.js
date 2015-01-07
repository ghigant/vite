/**
 * Main application routes
 */
'use strict';
module.exports = function(app) {
  
  app.route('/*')
    .get(function(req, res) {
      // console.log('index');
      res.sendFile(app.get('appPath') + '/home.html');
    });
};
