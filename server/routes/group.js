var express = require('express');
var router = express.Router();

var GroupController = require('../controllers/group');
var MatchmakingController = require('../controllers/group/matchmaking');
var VenueController = require('../controllers/venue');
var AuthGroupController = require('../controllers/auth/auth.group');

router.get('/', GroupController.index);
router.get('/:group_id', AuthGroupController.checkIfLoggedIn, GroupController.findById);
router.post('/', AuthGroupController.checkIfLoggedIn, GroupController.add);
router.put('/:group_id', AuthGroupController.hasGroupPermission, GroupController.update);
router.delete('/:group_id', AuthGroupController.hasGroupPermission, GroupController.delete);

router.put('/:group_id/addUser', AuthGroupController.checkIfLoggedIn, GroupController.addUserToGroup);
router.delete('/:group_id/removeUser', AuthGroupController.checkIfLoggedIn, GroupController.removeUserFromGroup);

router.put('/:group_id/event', AuthGroupController.hasGroupPermission, GroupController.addEventToGroup);
router.delete('/:group_id/event/:event_id', AuthGroupController.hasGroupPermission, GroupController.removeEventFromGroup);

// Test
router.get('/add/test', AuthGroupController.checkIfLoggedIn,
				MatchmakingController.addRecord);
router.get('/add/mm', AuthGroupController.checkIfLoggedIn,
				MatchmakingController.findAllEntries);

module.exports = router;