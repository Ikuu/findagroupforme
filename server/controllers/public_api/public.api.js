var User = require('../../models/user');
var Group = require('../../models/group');

// remove this
exports.index = function(req, res) {
	res.send('1');
};

// Returns all of the users in the database
exports.findAllUsers = function(req, res) {
	User
		.find()
		.where('private').equals(false)
		.select("-password -home_location -api -facebook -google -twitter -messages")
		.populate('groups', 'name interest')
		.exec(function(err, users) {
			var noUsers = (err || users.length === 0 || users === null);
			if (noUsers) return res.send({ error: "something has went wrong" });
			return res.send(users);
		});
};

// Returns a specific user
exports.findUser = function(req, res) {
	User
		.findOne({ _id: req.params.user_id })
		.where('private').equals(false)
		.populate('groups', 'name interest')
		.select("-password -home_location -api -facebook -google -twitter -messages")
		.exec(function(err, user) {
			var userNotFound = (err || user === null);
			if (userNotFound) return res.send({ error: "user does not exist, or is private" });
			return res.send(user);			
		});
};

// Returns all of the groups, maybe filter out private groups
exports.findAllGroups = function(req, res) {
	Group
		.find()
		.populate('members', 'username')
		.populate('owner', 'username')
		.exec(function(err, groups) {
			return res.send(groups);
		});
};

// Returns a specific group
exports.findGroup = function(req, res) {
	Group
		.findOne({ _id: req.params.group_id })
		.populate('members', 'username')
		.populate('owner', 'username')
		.exec(function(err, group) {
			var groupNotFound = (err || group === null);
			if (groupNotFound) {
				return res.send({ error: "group not found or is private" });
			}
			else {
				return res.send(group);
			}
		});
};

// return logged in user
exports.apiUserProfile = function(req, res) {
	User
		.findOne({ _id: req.apiUser._id })
		.populate('groups', 'name interest')
		.select("-password -facebook -google -twitter")
		.exec(function(err, user) {
			var userNotFound = (err || user === null);
			if (userNotFound) return res.send({ error: "user not found" });
			return res.send(user);			
		});
};

// return logged in users groups
exports.apiUserGroups = function(req, res) {
	Group
		.find({ members: { $in: [ req.apiUser._id ] } })
		.populate('members', 'username')
		.exec(function(err, groups) {
			var groupNotFound = (err || groups === null || groups.length === 0);
			if (groupNotFound) {
				return res.send({ error: "user has no groups" });
			}
			else {
				return res.send(groups);
			}
		});
};