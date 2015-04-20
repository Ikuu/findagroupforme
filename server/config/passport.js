var passport = require('passport');
var User = require('../models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Strategies
  require('./strategies/local')();
  require('./strategies/twitter')();
  require('./strategies/facebook')();
  require('./strategies/google')();
};