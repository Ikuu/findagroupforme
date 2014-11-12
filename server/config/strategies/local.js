var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user')

module.exports = function(){
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
};