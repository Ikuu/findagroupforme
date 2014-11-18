var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user/user');
var UserGroupController = require('../controllers/user/user.group');

router.get('/', UserController.index);
router.get('/:user_id', UserController.findById);
router.post('/', UserController.add);
router.put('/:user_id', UserController.update);
router.delete('/:user_id', UserController.delete)

router.get('/group/:group_id', UserGroupController.joinGroup);
router.delete('/group/:group_id', UserGroupController.removeGroup);

module.exports = router;