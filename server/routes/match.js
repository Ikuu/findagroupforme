var express = require('express');
var router = express.Router();

var MatchmakingController = require('../controllers/group/matchmaking');
var AuthGroupController = require('../controllers/auth/auth.group');

// router.get('/add/test', AuthGroupController.checkIfLoggedIn, MatchmakingController.addRecord);

// Need to add :user_id
router.get('/', AuthGroupController.checkIfLoggedIn,
				MatchmakingController.findMatch);

router.get('/remove/:id', AuthGroupController.checkIfLoggedIn, MatchmakingController.testFunc);

module.exports = router;