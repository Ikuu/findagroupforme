var express = require('express');
var router = express.Router();
// add cors to these or something

var PublicApiController = require('../controllers/public_api/public.api');
var AuthUserController = require('../controllers/auth/auth');

router.get('/users', AuthUserController.checkApiKey, PublicApiController.findAllUsers);
router.get('/user/:user_id', AuthUserController.checkApiKey, PublicApiController.findUser);

router.get('/groups', AuthUserController.checkApiKey, PublicApiController.findAllGroups);
router.get('/group/:group_id', AuthUserController.checkApiKey, PublicApiController.findGroup);

router.get('/apiuser', AuthUserController.checkApiKey, PublicApiController.apiUserProfile);
router.get('/apiuser/groups', AuthUserController.checkApiKey, PublicApiController.apiUserGroups);

module.exports = router;