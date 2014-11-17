module.exports = function(app, passport) {
	app.post('/auth/local', passport.authenticate('local', { successRedirect: '/login', failureRedirect: '/auth' }));

	// Twitter Routes
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect : '/#/users',
		failureRedirect : '/'
	}));

	// Facebook Routes
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/#/users',
		failureRedirect : '/'
	}));

	// Google Routes
	app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }));
	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect : '/#/users',
		failureRedirect : '/'
	}));

	// Set Cookie
	app.get('/login', function(req, res){
		/*
		res.cookie('userid', JSON.stringify({
			'userid': req.user._id,
			'username': req.user.username
        }), { maxAge: 2592000000 });  // Expires in one month
		*/
		res.redirect('/');
	});

	app.get('/log', function(req, res){
		res.send(req.session);
	});

	// Delete Cookie
	app.get('/logout', function(req, res){
		//res.clearCookie('userid');
		req.session.destroy();
		res.redirect('/signedout');
	})
};