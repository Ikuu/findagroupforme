var VenueController = require('../controllers/venue');

// Might want to make this to a controller. Feels wrong to have logic in route.
module.exports = function(app, passport) {
	app.post('/auth/local', passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/#/login'
	}));

/*	app.post('/auth/local', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.send(info.message);
			}
			req.login(user, function(err) {
				return res.send({info: "logged in"});
			})
		})(req, res, next);
	});*/

	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect : '/',
		failureRedirect : '/#/login'
	}));

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect : '/#/login'
	}));

	app.get('/auth/google', passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email']
	}));
	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect : '/',
		failureRedirect : '/#/login'
	}));

	// Debug function, prints session
	app.get('/log', function(req, res){
		res.send(req.session);
	});

	app.get('/session', function(req, res) {
		if (!req.user) {
			// 204 request recieved, empty response.
			res.status(204).end();
		}
		else {
			var loggedInUser = req.user;
			loggedInUser.password = undefined;
			res.send(loggedInUser);
		}
	});

	// Look at removing session from collection upon delete.
	app.get('/logout', function(req, res) {
		req.session.destroy();
		res.redirect('/');
	});

	app.get('/venue', function(req, res) {
		VenueController.test(req, res);
	})
};