'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = require('express')();

require('./config/express')(app);
require('./routes')(app);

app.listen(9000, function() {
  console.log('Express runing at port 9000');
});

module.exports = app;
