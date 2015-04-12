var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/user');
var configAuth = require('../auth');

module.exports = function(){
	passport.use(
		new GoogleStrategy({
			clientID: configAuth.googleAuth.clientID,
			clientSecret: configAuth.googleAuth.clientSecret,
			callbackURL: configAuth.googleAuth.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function(){
				console.log(profile);

				User.findOne({ 'google.id': profile.id }, function(err, user) {
					if (err) return res.send(err);
					if (user) {
						return done(null, user, { message: 'exisiting user' });
					}
					else {
						var newUser = new User();
						newUser.username = profile._json.email;
						newUser.name = profile.displayName;
						newUser.email = profile._json.email;
						newUser.home_location = {
							type: 'Point',
							coordinates: [-0.125891, 51.506200]
						};
						newUser.google.id = profile.id;
						newUser.google.token = accessToken;
						newUser.google.name = profile.displayName;

						newUser.save(function(err) {
							if (err) console.log(err);
						});

						return done(null, newUser, { message: 'new user' });
					}
				});
			});
		})
	);
};