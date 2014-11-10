var User = require('../../models/user');
var Group = require('../../models/group');

exports.index = function(req, res){
	User.find().populate('groups', 'name activity').exec(function (err, user){
		if (err) return handleError(err);
		res.send(user);
	});
}

exports.findById = function(req, res){
	User.findOne({_id: req.params.user_id}).populate('groups', 'name activity').exec(function (err, user){
		if (err) return handleError(err);
		res.send(user);
	});
}

exports.add = function(req, res){
	var newUser = new User(req.body);
	User.create(user, function(err, user){
		if (err) return handleError(err);
		res.send(user);
	});
}

exports.update = function(req, res){
	res.send("To be implemented.");
}

exports.delete = function(req, res){
	res.send("To be implemented.");
}