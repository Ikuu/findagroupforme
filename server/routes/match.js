var express = require('express');
var router = express.Router();

var MatchmakingController = require('../controllers/group/matchmaking');
var AuthGroupController = require('../controllers/auth/auth.group');

router.post('/', AuthGroupController.checkIfLoggedIn,
				MatchmakingController.findMatch);

//router.get('/remove/:id', AuthGroupController.checkIfLoggedIn, MatchmakingController.testFunc);
router.get('/user/', AuthGroupController.checkIfLoggedIn,
				MatchmakingController.findAllMatchesForUser);
router.delete('/remove/:id', AuthGroupController.checkIfLoggedIn, MatchmakingController.deleteMatch);

module.exports = router;