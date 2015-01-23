var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/user');
var configAuth = require('../auth');

module.exports = function(){
	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitterAuth.consumerKey,
		consumerSecret: configAuth.twitterAuth.consumerSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	}, function(token, tokenSecret, profile, done){
		process.nextTick(function(){
			User.findOne({'twitter.id': profile.id}, function(err, user){
				if (err) return done(err);
				if (user){
					console.log("User already exists!");
					return done(null, user); // user found, return that user
				}
				else{
					var newUser = new User();
					
					newUser.name = profile._json.name;
					newUser.username = profile.username;
					newUser.twitter.id = profile.id;
					newUser.twitter.token = token;
					newUser.twitter.username = profile.username;
					newUser.twitter.displayName = profile.displayName;

					newUser.save(function(err){
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
};