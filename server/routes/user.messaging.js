var express = require('express');
var router = express.Router();

var MessagingController = require('../controllers/user/user.messaging');
var AuthUserController = require('../controllers/auth/auth');

router.post('/viewed/:id', AuthUserController.checkIfLoggedIn, MessagingController.markAsViewed);
router.post('/unviewed/:id', AuthUserController.checkIfLoggedIn, MessagingController.markAsUnviewed);
router.delete('/delete/:id', AuthUserController.checkIfLoggedIn, MessagingController.deleteMessage);

module.exports = router;