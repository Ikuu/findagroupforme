var express = require('express');
var router = express.Router();

var TempGroupController = require('../controllers/group/temp.group');
var AuthGroupController = require('../controllers/auth/auth.group');

router.get('/:id', AuthGroupController.checkIfLoggedIn, TempGroupController.findById);
router.post('/invite/accept/:id', AuthGroupController.checkIfLoggedIn, TempGroupController.acceptInvite);
router.post('/invite/decline/:id', AuthGroupController.checkIfLoggedIn, TempGroupController.declineInvite);

module.exports = router;