var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user/user');
var AuthUserController = require('../controllers/auth/auth.user');
var UserGroupController = require('../controllers/user/user.group');

router.get('/', UserController.index);				
router.get('/:user_id', AuthUserController.checkIfLoggedIn, UserController.findById);	
router.post('/', AuthUserController.checkIfNotLoggedIn, UserController.add);				
router.put('/:user_id', AuthUserController.checkIfCorrectUser, UserController.update);		
router.delete('/:user_id', UserController.delete);	

router.get('/group/:group_id', UserGroupController.joinGroup);
router.delete('/group/:group_id', UserGroupController.removeGroup);

module.exports = router;