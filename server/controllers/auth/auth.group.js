var Group = require('../../models/group');

exports.checkIfLoggedIn = function(req, res, next){
	req.isAuthenticated() == false ? res.status(403).end() : next();
}

exports.hasGroupPermission = function(req, res, next){
	Group.find({_id: req.body._id, members: req.session.passport.user}).exec(function(err, group){
		group.length == 0 ? res.status(403).end() : next();
	});
}