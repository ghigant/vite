/**
 * Main application routes
 */
'use strict';
module.exports = function(app) {
  app.use('/auth', require('./auth'));

  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/editor', function(req, res) {
    res.render('editor.html');
  });
  // app.route('/*')
  //   .get(function(req, res) {
  //     // console.log('index');
  //     res.sendFile(app.get('appPath') + '/home.html');
  //   });
};
