var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/user')
var configAuth = require('../auth');

module.exports = function(){
	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	}, function(accessToken, refreshToken, profile, done){
  		process.nextTick(function(){
  			User.findOne({'facebook.id': profile.id}, function(err, user){
  				if (err) return handleError(err);
  				if (user){
  					return done(null, user);
  				}
  				else{
  					var newUser = new User();
	
  					newUser.google.id = profile.id;
					newUser.google.token = accessToken;
					newUser.google.name = profile.displayName;
					newUser.twitData = profile;
					
					newUser.save(function(err){
						if (err) handleErr(err);
					});
	
					return done(null, newUser);
				}		
			});
		});
	}));
}