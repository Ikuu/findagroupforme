var User = require('../models/user');
var Group = require('../models/group');

exports.index = function(req, res){
	Group.find().populate('members', 'name').exec(function (err, group){
		if (err) return handleError(err);
		res.send(group);
	});
}

exports.findById = function(req, res){
	Group.findOne({_id: req.params.group_id}).populate('members', 'name').exec(function(err, group){
		if (err) return handleError(err);
		res.send(group)
	});
}

exports.add = function(req, res){
	var newGroup = new Group(req.body);
	newGroup.members.push(req.user._id);

	User.findOne({_id: req.user._id}).exec(function(err, user){
		user.groups.push(newGroup._id);
		user.save(function(err){
			if (err) return handleError(err);
		});
	});

	Group.create(newGroup, function(err, group){
		if (err) return handleError(err);
		res.send({
			_id: newGroup._id,
			message: "Received."
		});
	});
}

exports.update = function(req, res){
	var updatedGroup = new Group(req.body);
	var update = {
		"name": updatedGroup.name,
		"description": updatedGroup.description,
		"activity": updatedGroup.activity,
		"venue_location": updatedGroup.venue_location
	};
	Group.findByIdAndUpdate(updatedGroup._id, update, function(err){
		res.send("Updated");
	});
}

exports.delete = function(req, res){
	// Would want to remove all of the members from the group too. Grab all the Member IDs from the group and loop through each and remove from that user. Might want to see if this can be done in one call.
	Group.findByIdAndRemove(req.params.group_id, function(err, group) {
		group.remove();
		if (err) return handleError(err);
		res.send({});
	});
}