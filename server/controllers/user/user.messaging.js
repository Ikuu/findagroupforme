// User Messaging Functions - Might need an addMessage function here
var User = require('../../models/user');

exports.markAsViewed = function(req, res) {
	var query = { _id: req.user._id, "messages._id": req.params.id };
	var update = { $set: { "messages.$.viewed": true } };

	User.update(query, update, function(err, user) {
		var msgNotFound = (err || user.nModified === 0);
		if (msgNotFound) return res.send({ error: "message does not exist" });
		return res.send({ message: "message has been marked as viewed" });
	});
};

exports.markAsUnviewed = function(req, res) {
	var query = { _id: req.user._id, "messages._id": req.params.id };
	var update = { $set: { "messages.$.viewed": false } };

	User.update(query, update, function(err, user) {
		var msgNotFound = (err || user.nModified === 0);
		if (msgNotFound) return res.send({ error: "message does not exist" });
		return res.send({ message: "message has been marked as unviewed" });
	});
};

exports.deleteMessage = function(req, res) {
	console.log(req.params);
	User.findOne({ _id: req.user._id }).exec(function(err, user) {
		try {
			user.messages.id(req.params.id).remove();
		}
		catch(err) {
			console.log(err);
			return res.send({ error: 'could not delete message' });
		}
		
		user.save(function(err) {
			if (err) return res.send({ error: 'could not delete message' });
			return res.send({ message: 'message was deleted' });
		});
	});
};