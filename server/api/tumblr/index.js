'use strict'

var express     = require('express');
var controller  = require('./tumblr.controller');
var auth        = require('../../auth/auth.service');
var router      = express.Router();

router.get('/info/:filter', auth.isAuthenticated(), controller.info);

module.exports = router;
