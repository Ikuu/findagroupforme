var express = require('express');
var router = express.Router();

var PublicApiController = require('../controllers/user/user.public.api');
var AuthUserController = require('../controllers/auth/auth');

router.get('/', PublicApiController.generatePublicApiKey);

module.exports = router;