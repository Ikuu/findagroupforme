var express = require('express');
var router = express.Router();

var user = require('../controllers/user/user');
var userGroup = require('../controllers/user/user.group');

router.get('/', user.index);
router.get('/:user_id', user.findById);
router.post('/:user_id', user.add);
router.put('/:user_id', user.update);
router.delete('/:user_id', user.delete)

router.get('/group/:group_id', userGroup.joinGroup);
router.delete('/group/:group_id', userGroup.removeGroup);

module.exports = router;