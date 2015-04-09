var express = require('express');
var router = express.Router();

var PublicApiController = require('../controllers/public_api/public.api');
var AuthUserController = require('../controllers/auth/auth');

router.get('/', PublicApiController.index);

module.exports = router;