var express = require('express');
var router = express.Router();

// add cors to these or something

var PublicApiController = require('../controllers/user/user.public.api');
var AuthUserController = require('../controllers/auth/auth');

router.get('/', PublicApiController.generatePublicApiKey);

module.exports = router;