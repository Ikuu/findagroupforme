var User = require('../models/user');
var Group = require('../models/group');

exports.index = function(req, res) {
	Group.find().populate('members', 'name current_location').exec(function (err, group) {
		if (err) {
            return handleError(err);
        }
		return res.send(group);
	});
};

exports.findById = function(req, res) {
	var userInGroup = false;

	Group.findOne({_id: req.params.group_id}).populate('members', 'name current_location').exec(function(err, group) {
		if (err || group === null) return res.send({error: "group could not be found."});

		if (group.private) {
			for (var i = 0; i < group.members.length; i++) {
				if (group.members[i]._id.equals(req.user._id)) {
					userInGroup = true;
				}
			}
		}

		if (userInGroup || !group.private) {
			console.log("return full group")
			return res.send(group);
		}
		else {
			return res.send({
				id: group._id,
				name: group.name,
				privateGroup: true
			});
		}
	});
};

exports.add = function(req, res) {
	var userObjectMissing = (req.user === undefined || req.user === null);
	var bodyObjectMissing = (req.body === undefined || req.body === null);

	if (userObjectMissing) {
		return res.send({error: "user does not exist."});
	}
	else if (bodyObjectMissing) {
		return res.send({error: "body is empty."});
	}
	else {
		var newGroup = new Group(req.body);
		newGroup.owner = req.user._id;
		newGroup.members.push(req.user._id);
	
		User.findOne({_id: req.user._id}).exec(function(err, user) {
			if (err) return res.send(err);
			user.groups.push(newGroup._id);
			user.save(function(err){
			});
		});
	
		Group.create(newGroup, function(err, group) {
			if (err) return res.send({error: "unable to create group."});
			res.send({
				_id: group._id,
				name: group.name,
				owner: group.owner,
				members: group.members,
				message: "Received."
			});
		});
	}
};

// Might need to remake the object due to populate.
// Could make another end-point that returns without populate, and have Edit call that.
exports.update = function(req, res) {
	if (req.body._id === undefined) {
		return res.send({error: "could not update group."});
	}
	else {
		var updatedGroup = new Group(req.body);
		var update = {
		 	"name": updatedGroup.name,
		 	"description": updatedGroup.description,
		 	"private": updatedGroup.private,
		 	"activity": updatedGroup.activity,
		 	"venue_location": updatedGroup.venue_location
		};
	
		Group.findByIdAndUpdate(updatedGroup._id, update, function(err, doc) {
			if (err) return res.send({error: "could not update group"});
			res.send({message: "group has been updated."});
		});
	}
};

exports.delete = function(req, res) {
	Group.findByIdAndRemove(req.params.group_id, function(err, group) {
		if (err) return res.send({error: "unable to delete group."});
		User.update({groups: req.params.group_id},
			{$pull :{ 'groups': req.params.group_id}},
			{multi: true}).exec(function(err) {});
		group.remove();
		res.send({});
	});
};

exports.addUserToGroup = function(req, res) {
	User.findOne({_id: req.user._id, groups: {"$nin" : [req.params.group_id]}}).exec(function(err, user) {
		if (err || user === null) return res.send({error: "user already belongs to group."});
		user.groups.push(req.params.group_id);
		user.save();

		Group.findOne({_id: req.params.group_id}).exec(function(err, group) {
			if (err) return res.send({error: "group does not exist."});
			group.members.push(req.user._id);
			group.save();
		});

		res.send({message: "user added to group."});	
	});

	
};

exports.removeUserFromGroup = function(req, res) {
	User.findOne({_id: req.user._id, groups: req.params.group_id}).exec(function(err, user) {
		if (err || user === null) {
			return res.send({error: "user does not belong to group."});
		}
		else {
			user.groups.pull(req.params.group_id);
			user.save(function(err) {
				if (err) return handleError(err);
			});
	
			Group.findOne({_id: req.params.group_id}).exec(function(err, group) {
				group.members.pull(req.user._id);
				group.save(function(err) {
					if (err) return handleError(err);
				});
			});
	
			res.send({message: "user removed from group."});
		}
	});
};