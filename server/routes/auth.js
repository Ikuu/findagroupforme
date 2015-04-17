var User = require('../models/user');
var moment = require('moment');
var _ = require('lodash');

module.exports = function(app, passport) {
  app.post('/auth/local', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/#/login'
  }));

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      if (req.authInfo.message === 'exisiting user') {
        return res.redirect('/');
      }
      else {
        // maybe setttings/firsttime then on client read firsttime and diplay message
        return res.redirect('/#/settings');
      }
    });

  app.get('/auth/facebook', passport.authenticate('facebook', { 
    scope: 'email, user_location' 
  }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect : '/#/login' }),
    function(req, res) {
      if (req.authInfo.message === 'exisiting user') {
        return res.redirect('/');
      }
      else {
        // maybe setttings/firsttime then on client read firsttime and diplay message
        return res.redirect('/#/settings');
      }
    });

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.email']
  }));
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect : '/#/login' }),
    function(req, res) {
      if (req.authInfo.message === 'exisiting user') {
        return res.redirect('/');
      }
      else {
        // maybe setttings/firsttime then on client read firsttime and diplay message
        return res.redirect('/#/settings');
      }
    });

  // Debug function, prints session
  app.get('/log', function(req, res) {
    res.send(req.session);
  });

  // This needs to be it's own route
  function filterEvents(results) {
    var currentTime = moment();
    var today = moment().startOf('day');
    var tomorrow = moment(today).add(1, 'days').add(1, 'hour');
  
    _.each(results, function(r, index) {
      var events = [];
  
      _.each(r.events, function(e) {
        var eventIsToday = (e.date >= currentTime.toDate());
        var eventNotTomorrow = (e.date < tomorrow.toDate());
  
        if (eventIsToday && eventNotTomorrow) {
          events.push(e);
        }
      });
  
      // Update the results to the filtered r(esult).
      r.events = events;
      results[index] = r;
    });
  
    return results;
  }

  app.get('/session', function(req, res) {
    if (!req.user) {
      // 204 request recieved, empty response.
      res.status(204).end();
    }
    else {
      User
        .findOne({ _id: req.user._id })
        .populate('groups', 'name interest location events')
        .select('-salt -password')
        .exec(function(err, user) {
          user.groups = filterEvents(user.groups);
          return res.send(user);
        });
    }
  });

  // Look at removing session from collection upon delete.
  app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });
};