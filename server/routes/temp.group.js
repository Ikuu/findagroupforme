var express = require('express');
var router = express.Router();

var TempGroupController = require('../controllers/group/temp.group');
var AuthGroupController = require('../controllers/auth/auth.group');

router.get('/:id', AuthGroupController.checkIfLoggedIn, TempGroupController.findById);

module.exports = router;