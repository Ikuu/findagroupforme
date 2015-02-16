var User = require('../../models/user');
var Group = require('../../models/group');

exports.index = function(req, res) {
	User.find().populate('groups', 'name activity').exec(function (err, user) {
		if (err) return handleError(err);
		res.send(user);
	});
};

exports.findById = function(req, res) {
	User.findOne({_id: req.params.user_id}).populate('groups', 'name activity').exec(function (err, user) {
		var noUserFound = (err || user === null);

		if (noUserFound) {
			return res.send({error: "_id supplied was not valid."});
		}
		else if (user.private && !user._id.equals(req.user._id)) {
			return res.send({
				_id: user._id,
				username: user.username,
				private: user.private
			});
		}
		else {
			return res.send(user);
		}
	});
};

exports.add = function(req, res) {
	var userToAdd = new User(req.body);
	User.create(userToAdd, function(err, user) {
		if (err || user === null) return res.send(err);
		return res.send(user);
	});
};

exports.update = function(req, res) {
	if (req.user === undefined) {
		return res.send({error: "could not update user."});
	}
	else {
		var update = {
			"name": req.body.name,
			"email": req.body.email,
			"address": req.body.address,
			"password": req.body.password,
			"activities": req.body.activities,
			"private": req.body.private,
			"home_location": req.body.home_location,
			"current_location": req.body.current_location
		};

		User.findByIdAndUpdate(req.user._id, update, function(err) {
			if (err) return res.send({"error": err});
			return res.send({message: "User has been updated"});
		});
	}
};

exports.delete = function(req, res) {
	User.findByIdAndRemove(req.params.user_id, function(err, user) {
		if (err || user === null) return res.send({error: "unable to delete id"});
		user.remove();
		res.send({});
	});
};

// Strip Password
exports.findLoggedInUser = function(req, res) {
	User.findOne({_id: req.user._id}).populate('groups', 'name activity').exec(function (err, user) {
		if (err) return handleError(err);
		res.send(user);
	});
};