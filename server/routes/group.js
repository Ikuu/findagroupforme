var express = require('express');
var router = express.Router();

var GroupController = require('../controllers/group');
var AuthController = require('../controllers/auth/auth');

router.get('/', GroupController.index);
router.get('/:group_id', AuthController.checkIfLoggedIn, GroupController.findById);
router.post('/', GroupController.add);
router.put('/:group_id', AuthController.checkIfLoggedIn, GroupController.update);
router.delete('/:group_id', GroupController.delete);

module.exports = router;