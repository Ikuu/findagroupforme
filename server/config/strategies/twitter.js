var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/user');
var configAuth = require('../auth');

var geocoderProvider = 'google';
var httpAdapter = 'http';
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);

module.exports = function(){
  passport.use(
  new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      User.findOne({'twitter.id': profile.id}, function(err, user){
        if (err) return done(err);
        if (user) {
          return done(null, user, { message: 'exisiting user' });
        }
        else{
          geocoder.geocode(profile._json.location, function(err, res) {
            if (err) return done(err);

            var newUser = new User();
            newUser.name = profile._json.name;
            newUser.username = profile.username;
            newUser.strategy = 'twitter';

            // If no location is provided, we set them to London
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

            newUser.twitter.id = profile.id;
            newUser.twitter.token = token;
            newUser.twitter.username = profile.username;
            newUser.twitter.displayName = profile.displayName;

            newUser.save(function(err){
              if (err) throw err;
              return done(null, newUser, { message: 'new user' });
            });
          })  
        }
      });
    });
  }));
};