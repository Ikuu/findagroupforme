module.exports = function(app, passport) {
	app.post('/auth/local', passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/#/signup'
	}));

	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect : '/',
		failureRedirect : '/#/signup'
	}));

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect : '/#/signup'
	}));

	app.get('/auth/google', passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email']
	}));
	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect : '/',
		failureRedirect : '/#/signup'
	}));

	app.get('/login', function(req, res){
		res.redirect('/');
	});

	// Debug function, prints session
	app.get('/log', function(req, res){
		res.send(req.session);
	});

	app.get('/session', function(req, res) {
		if (!req.user) res.send({});
		else {
			var loggedInUser = req.user;
			loggedInUser.password = undefined;
			res.send(loggedInUser);
		}
	});

	app.get('/logout', function(req, res){
		req.session.destroy();
		res.redirect('/');
	});
};