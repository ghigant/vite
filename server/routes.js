/**
 * Main application routes
 */
'use strict';
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.route('/*')
    .get(function(req, res) {
      // console.log('index');
      res.sendFile(app.get('appPath') + '/home.html');
    });
};
