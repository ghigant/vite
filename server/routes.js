/**
 * Main application routes
 */
'use strict';

var auth = require('./auth/auth.service');

module.exports = function(app) {
  app.use('/auth', require('./auth'));

  app.use('/api/user', require('./api/user'));
  app.use('/api/tumblr', require('./api/tumblr'));

  // app.get('/', function(req, res) {
  //   res.render('index.html');
  // });
  //
  // app.get('/editor', auth.isAuthenticated(), function(req, res) {
  //   console.log(req.user);
  //   res.render('editor.html');
  // });

  app.route('/*')
    .get(function(req, res) {
      // console.log('index');
      res.sendFile(app.get('appPath') + '/home.html');
    });
};
