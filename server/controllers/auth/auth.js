exports.checkIfLoggedIn = function(req, res, next){
	req.session.passport.user == null ? res.status(403).end() : next();
}

// Check to see if the user is modiying the correct User.
exports.checkIfCorrectUser = function(req, res, next){
	req.session.passport.user == req.body._id ? next() : res.status(403).end();
}