var Group = require('../../models/group');

exports.checkIfLoggedIn = function(req, res, next) {
	req.session.passport.user === null ? res.status(403).end() : next();
}

// Check to see if the user is modiying the correct User.
exports.checkIfCorrectUser = function(req, res, next) {
	req.session.passport.user === req.body._id ? next() : res.status(403).end();
}

exports.hasGroupPermission = function(req, res, next) {
	Group.find({_id: req.body._id, members: req.session.passport.user}).exec(function(err, group){
		group.length === 0 ? res.status(403).end() : next();
	});
}