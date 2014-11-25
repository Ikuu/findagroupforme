exports.checkIfLoggedIn = function(req, res, next) {
	req.isAuthenticated() === true ? next() : res.status(403).end();
}

exports.checkIfNotLoggedIn = function(req, res, next) {
	req.isAuthenticated() === false ? next() : res.status(403).end();
}

exports.checkIfCorrectUser = function(req, res, next) {
	req.session.passport.user === req.body._id ? next() : res.status(403).end();
}

/*
get('/');				// Let everyone see this for now
get('/:user_id');		// Have to be logged in to view, or could show a stripped down version
post('/');				// Check to see if NOT logged in.
put('/:user_id');		// Have to be the logged in as the user they're updating
delete('/:user_id');	// Might want to hide this, stop people deleting accounts.
*/