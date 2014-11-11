var configAuth = require('./auth');
var User = require('../models/user');

// Strategies
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	// Probably want to split these up.
	// Local
	passport.use(new LocalStrategy(
		function(username, password, done){
			User.findOne({username: username}, function(err, user){
				if (err) return handleError(err);
				if (!user){
					return done (null, false, {message: 'incorrect username.'});
				}
				if (user.password != password){
					return done (null, false, {message: 'incorrect password'});
				}
				return done(null, user);
			});
		}
	));

	// Twitter
	passport.use(new TwitterStrategy({
		consumerKey : configAuth.twitterAuth.consumerKey,
		consumerSecret : configAuth.twitterAuth.consumerSecret,
		callbackURL : configAuth.twitterAuth.callbackURL
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

					newUser.username = profile.username;
					newUser.twitter.id = profile.id;
					newUser.twitter.token = token;
					newUser.twitter.username = profile.username;
					newUser.twitter.displayName = profile.displayName;
					newUser.twitData = profile._json;

					newUser.save(function(err){
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));

	// Facebook
	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	}, function(accessToken, refreshToken, profile, done){
		process.nextTick(function(){
			User.findOne({'facebook.id': profile.id}, function(err, user){
				if (err) return handleError(err);
				if (user){
					return done(null, user);
				}
				else{
					var newUser = new User();

					newUser.facebook.id = profile.id;
					newUser.facebook.token = accessToken;
					newUser.facebook.name = profile.displayName;
					newUser.twitData = profile;

					newUser.save(function(err){
						if (err) handleErr(err);
					});

					return done(null, newUser);
				}		
			});
		});
	}));

	// Google+
	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done){
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