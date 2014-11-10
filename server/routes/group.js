var express = require('express');
var router = express.Router();

var group = require('../controllers/group');

router.get('/', group.index);
router.get('/:group_id', group.findById);
router.post('/', group.add);
router.put('/:group_id', group.update);
router.delete('/:group_id', group.delete);

module.exports = router;