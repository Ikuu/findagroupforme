var express = require('express');
var router = express.Router();

var MatchmakingController = require('../controllers/group/matchmaking');
var AuthUserController = require('../controllers/auth/auth.group');

router.post('/', AuthUserController.checkIfLoggedIn,
        MatchmakingController.findMatch);

//router.get('/remove/:id', AuthGroupController.checkIfLoggedIn, MatchmakingController.testFunc);
router.get('/user/', AuthUserController.checkIfLoggedIn,
        MatchmakingController.findAllMatchesForUser);
router.delete('/remove/:id', AuthUserController.checkIfLoggedIn, MatchmakingController.deleteMatch);

module.exports = router;