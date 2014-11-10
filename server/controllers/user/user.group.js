var User = require('../../models/user');
var Group = require('../../models/group');

exports.joinGroup = function(req, res){
	User.findOne({_id: req.params.user_id}).exec(function(err, user){
		user.groups.push(req.params.group_id);
		user.save(function(err){
			if (err) return handleError(err);
		});
	});

	Group.findOne({_id: req.params.group_id}).exec(function(err, group){
		group.members.push(req.params.user_id);
		group.save(function(err){
			if (err) return handleError(err);
		});
	});

	res.send("Should have worked!");
}

exports.removeGroup = function(req, res){
	User.findOne({_id: req.params.user_id}).exec(function(err, user){
		user.groups.pull(req.params.group_id);
		user.save(function(err){
			if (err) return handleError(err);
		});
	});

	Group.findOne({_id: req.params.group_id}).exec(function(err, group){
		group.members.pull(req.params.user_id);
		group.save(function(err){
			if (err) return handleError(err);
		});
	});

	res.send("Should have worked!");
}