var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user');
var configAuth = require('../auth');

var geocoderProvider = 'google';
var httpAdapter = 'http';
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);

module.exports = function() {
  passport.use(
  new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if (err) return handleError(err);
        if (user) {
          return done(null, user, { message: 'exisiting user' });
        }
        else {
          geocoder.geocode(profile._json.location.name, function(err, res) {
            if (err) return done(err);
            var newUser = new User();

            newUser.name = profile.displayName;
            newUser.username = profile.displayName;
            newUser.email = profile._json.email;
            newUser.strategy = 'facebook';

            if (res.length === 0) {
              newUser.home_location = {
                type: 'Point',
                coordinates: [-0.125891, 51.506200]
              }
            }
            else {
              newUser.home_location = {
                type: 'Point',
                coordinates: [res[0].longitude, res[0].latitude]
              }
            }
  
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.displayName;
  
            newUser.save();
            return done(null, newUser, { message: 'new user' });
          });
        }
      });
    });
  }));
};