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

	app.get('/login', function(req, res){
		console.log(req.user);
		res.cookie('testCookie', {
			name: req.user.username
		});
		res.redirect('/');
	});
};