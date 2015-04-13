var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user/user');
var UserApiController = require('../controllers/user/user.public.api');
var AuthUserController = require('../controllers/auth/auth.user');
var InterestController = require('../controllers/user/user.interest');

router.get('/', UserController.index);				
router.get('/:user_id', AuthUserController.checkIfLoggedIn, UserController.findById);	
router.post('/', AuthUserController.checkIfNotLoggedIn, UserController.add);				
router.put('/:user_id', AuthUserController.checkIfCorrectUser, UserController.update);		
router.delete('/:user_id', UserController.delete);

router.post('/interest/add/:interest', AuthUserController.checkIfLoggedIn, InterestController.addInterest);
router.delete('/interest/remove/:interest', AuthUserController.checkIfLoggedIn, InterestController.removeInterest);

router.get('/session/active', AuthUserController.checkIfLoggedIn, UserController.findLoggedInUser);

router.get('/interest/find', AuthUserController.checkIfLoggedIn, UserController.findNewInterest);

router.put('/publicApi/create', AuthUserController.checkIfLoggedIn, UserApiController.generatePublicApiKey);
router.put('/publicApi/regen', AuthUserController.checkIfLoggedIn, UserApiController.generateNewPublicApiKey);
router.delete('/publicApi/delete', AuthUserController.checkIfLoggedIn, UserApiController.deletePublicApiKey);

module.exports = router;