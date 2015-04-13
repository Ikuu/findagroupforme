var User = require('../../models/user');
var Group = require('../../models/group');

// user - returns user details STRIP PASSWORD and LOCATION
// user/id - returns user
// group - returns groups
// group/id - returns group
// me - returns your details, more detailed

exports.index = function(req, res) {
	res.send('1');
};

// Returns all of the users in the database
exports.findAllUsers = function(req, res) {
	User
		.find()
		.select("-password -home_location -api -facebook -google -twitter")
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
		.populate('groups', 'name interest')
		.select("-password -home_location -api -facebook -google -twitter")
		.exec(function(err, user) {
			var userNotFound = (err || user === null);
			if (userNotFound) return res.send({ error: "user does not exist" });
			return res.send(user);			
		});
};

// Returns all of the groups, maybe filter out private groups
exports.findAllGroups = function(req, res) {
	Group
		.find()
		.populate('members', 'username')
		.exec(function(err, groups) {
			return res.send(groups);
		});
};

// Returns a specific group
exports.findGroup = function(req, res) {
	Group
		.findOne({ _id: req.params.group_id })
		.populate('members', 'username')
		.exec(function(err, group) {
			var groupNotFound = (err || group === null);
			if (groupNotFound) {
				return res.send({ error: "invalid group id" });
			}
			else {
				return res.send(group);
			}
		});
};