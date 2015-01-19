var User = require('../../models/user');
var Group = require('../../models/group');

exports.index = function(req, res){
	User.find().populate('groups', 'name activity').exec(function (err, user){
		if (err) return handleError(err);
		res.send(user);
	});
};

exports.findById = function(req, res){
	User.findOne({_id: req.params.user_id}).populate('groups', 'name activity').exec(function (err, user){
		if (err) return handleError(err);
		res.send(user);
	});
};

exports.add = function(req, res){
	var newUser = new User(req.body);
	User.create(newUser, function(err, user){
		if (err) return handleError(err);
		res.send(user);
	});
};

exports.update = function(req, res){
	var updatedUser = new User(req.body);
	var update = {
		"name": updatedUser.name,
		"email": updatedUser.email,
		"home_location": [updatedUser.home_location[0], updatedUser.home_location[1]],
		"current_location": [updatedUser.current_location[0], updatedUser.current_location[1]]
	};

	User.findByIdAndUpdate(req.user._id, update, function(err){
		if (err) return res.send({"error": err});
		res.send({message: "User has been updated"});
	});
};

exports.delete = function(req, res){
	User.findByIdAndRemove(req.params.user_id, function(err, user) {
		user.remove();
		if (err) return handleError(err);
		res.send({});
	});
};

// Strip Password
exports.findLoggedInUser = function(req, res){
	User.findOne({_id: req.user._id}).populate('groups', 'name activity').exec(function(err, user){
		if (err) return handleError(err);
		res.send(user);
	});
};