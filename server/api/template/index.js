'use strict'

var express     = require('express');
var controller  = require('./template.controller');
var auth        = require('../../auth/auth.service');
var router      = express.Router();

router.post('/save', auth.isAuthenticated(), controller.save);
router.get('/preview/:userId', controller.preview);
router.get('/download/:userId', controller.download);

module.exports = router;
