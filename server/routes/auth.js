module.exports = function(app, passport) {
	app.post('/auth/login', passport.authenticate('local', {
									successRedirect: '/',
									failureRedirect: '/login'
								})
	);

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

};