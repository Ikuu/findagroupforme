var User = require('../../models/user');

exports.generatePublicApiKey = function(req, res) {
	User.findOne({ _id: req.user._id }).exec(function(err, user) {
		user.generateApiKey(req.body.api.project);
		return res.send(user);
	});
};

exports.generateNewPublicApiKey = function(req, res) {
	User.findOne({ _id: req.user._id }).exec(function(err, user) {
		var noKey = (err || user === null || user.api.key === undefined);
		if (noKey) {
			return res.send({ error: "no key present" });
		}

		user.generateNewApiKey();
		user.save();
		return res.send(user);
	});
};

exports.deletePublicApiKey = function(req, res) {
	User.update({ _id: req.user._id }, { $set: { api: {} }}, function(err, affected) {
		User.findOne({ _id: req.user._id }).exec(function(err, user) {
			if (err || user === null) return res.send({ error: "could not find user" });
			return res.send(user);
		});
	});
};