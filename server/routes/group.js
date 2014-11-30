var express = require('express');
var router = express.Router();

var GroupController = require('../controllers/group');
var AuthGroupController = require('../controllers/auth/auth.group');

router.get('/', GroupController.index);
router.get('/:group_id', AuthGroupController.checkIfLoggedIn, GroupController.findById);
router.post('/', AuthGroupController.checkIfLoggedIn, GroupController.add);
router.put('/:group_id', AuthGroupController.hasGroupPermission, GroupController.update);
router.delete('/:group_id', AuthGroupController.hasGroupPermission, GroupController.delete);

router.put('/:group_id/addUser', AuthGroupController.checkIfLoggedIn, GroupController.addUserToGroup);
router.put('/:group_id/removeUser', AuthGroupController.checkIfLoggedIn, GroupController.removeUserFromGroup);

module.exports = router;