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

	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/#/users',
		failureRedirect : '/'
	}));
};