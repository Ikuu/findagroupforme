var User = require('../models/user');
var Group = require('../models/group');

exports.index = function(req, res) {
	Group.find().populate('members', 'name current_location').exec(function (err, group){
		if (err) return handleError(err);
		res.send(group);
	});
};

exports.findById = function(req, res) {
	Group.findOne({_id: req.params.group_id}).populate('members', 'name current_location').exec(function(err, group){
		if (err) return res.send({error: "group could not be found."});
		res.send(group);
	});
};

exports.add = function(req, res) {
	if (req.user === undefined) {
		return res.send({error: "user does not exist."});
	}

	var newGroup = new Group(req.body);
	newGroup.members.push(req.user._id);

	User.findOne({_id: req.user._id}).exec(function(err, user) {
		if (err) return res.send(err);
		user.groups.push(newGroup._id);
		user.save(function(err){
		});
	});

	Group.create(newGroup, function(err, group){
		if (err) return res.send({error: "unable to create group."});
		res.send({
			_id: group._id,
			name: group.name,
			members: group.members,
			message: "Received."
		});
	});
};

exports.update = function(req, res) {
	if (req.body._id === undefined) {
		return res.send({error: "could not update group."});
	}

	var updatedGroup = new Group(req.body);
	var update = {
		"name": updatedGroup.name,
		"description": updatedGroup.description,
		"activity": updatedGroup.activity,
		"venue_location": updatedGroup.venue_location
	};

	Group.findByIdAndUpdate(updatedGroup._id, update, function(err){
		if (err) return res.send({error: "could not update group"});
		res.send({message: "group has been updated."});
	});
};

exports.delete = function(req, res) {
	// Would want to remove all of the members from the group too. Grab all the Member IDs from the group and loop through each and remove from that user. Might want to see if this can be done in one call.
	Group.findByIdAndRemove(req.params.group_id, function(err, group) {
		if (err) return res.send({error: "unable to delete group."});
		group.remove();
		res.send({});
	});
};

// Need to check if User is already in the group, can join the group etc.
exports.addUserToGroup = function(req, res) {
	User.findOne({_id: req.user._id}).exec(function(err, user) {
		if (err) return res.send({error: "user does not exist."});
		user.groups.push(req.params.group_id);
		user.save(function(err){
			if (err) return handleError(err);
		});
	});

	Group.findOne({_id: req.params.group_id}).exec(function(err, group) {
		if (err) return res.send({error: "group does not exist."});
		group.members.push(req.user._id);
		group.save(function(err) {
			if (err) return handleError(err);
		});
	});

	res.send({message: "user added to group."});
};

exports.removeUserFromGroup = function(req, res) {
	User.findOne({_id: req.user._id}).exec(function(err, user) {
		user.groups.pull(req.params.group_id);
		user.save(function(err){
			if (err) return handleError(err);
		});
	});

	Group.findOne({_id: req.params.group_id}).exec(function(err, group) {
		group.members.pull(req.user._id);
		group.save(function(err) {
			if (err) return handleError(err);
		});
	});

	res.send({message: "user removed from group."});
};