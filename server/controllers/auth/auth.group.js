var Group = require('../../models/group');

exports.checkIfLoggedIn = function(req, res, next) {
	req.isAuthenticated() === false ? res.status(401).end() : next();
};

exports.hasGroupPermission = function(req, res, next) {
	Group.find({_id: req.params.group_id, members: req.session.passport.user}).exec(function(err, group){
		group.length === 0 ? res.status(401).end() : next();
	});
};