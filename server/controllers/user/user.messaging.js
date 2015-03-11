// User Messaging Functions
var User = require('../../models/user');

exports.markAsViewed = function(req, res) {
	var query = { _id: req.user._id, "messages._id": req.params.id };
	var update = { $set: { "messages.$.viewed": true } };

	User.update(query, update, function(err, user) {
		return res.send(user);
	});
};

exports.markAsUnviewed = function(req, res) {
	var query = { _id: req.user._id, "messages._id": req.params.id };
	var update = { $set: { "messages.$.viewed": false } };

	User.update(query, update, function(err, user) {
		return res.send(user);
	});
};

exports.deleteMessage = function(req, res) {
	User.findOne({ _id: req.user._id }).exec(function(err, user) {
		user.messages.id(req.params.id).remove();
		user.save(function(err) {
			if (err) return res.send({ error: 'could not delete message' });
			return res.send({ message: 'message was deleted.' });
		});
	});
};