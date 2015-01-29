var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user');
var configAuth = require('../auth');

module.exports = function() {
	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	}, function(accessToken, refreshToken, profile, done){
		process.nextTick(function() {
			User.findOne({'facebook.id': profile.id}, function(err, user) {
				if (err) return handleError(err);
				if (user) return done(null, user);
				else {
					var newUser = new User();

					newUser.name = profile.displayName;
					newUser.username = profile.displayName;

					newUser.facebook.id = profile.id;
					newUser.facebook.token = accessToken;
					newUser.facebook.name = profile.displayName;

					newUser.save();
					return done(null, newUser);
				}		
			});
		});
	}));
};