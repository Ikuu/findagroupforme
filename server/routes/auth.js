module.exports = function(app, passport) {
	app.post('/auth/local', passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/#/login'
	}));

	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', 
		passport.authenticate('twitter', { failureRedirect: '/login' }),
		function(req, res) {
			if (req.authInfo.message === 'exisiting user') {
				return res.redirect('/');
			}
			else {
				// maybe setttings/firsttime then on client read firsttime and diplay message
				return res.redirect('/#/settings');
			}
		});

	app.get('/auth/facebook', passport.authenticate('facebook', { 
		scope: 'email, user_location' 
	}));
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect : '/#/login' }),
		function(req, res) {
			if (req.authInfo.message === 'exisiting user') {
				return res.redirect('/');
			}
			else {
				// maybe setttings/firsttime then on client read firsttime and diplay message
				return res.redirect('/#/settings');
			}
		});

	app.get('/auth/google', passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/plus.login',
		'https://www.googleapis.com/auth/userinfo.email']
	}));
	app.get('/auth/google/callback',
		passport.authenticate('google', { failureRedirect : '/#/login' }),
		function(req, res) {
			if (req.authInfo.message === 'exisiting user') {
				return res.redirect('/');
			}
			else {
				// maybe setttings/firsttime then on client read firsttime and diplay message
				return res.redirect('/#/settings');
			}
		});

	// Debug function, prints session
	app.get('/log', function(req, res) {
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
};