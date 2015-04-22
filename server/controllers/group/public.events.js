var User = require('../../models/user');
var Group = require('../../models/group');
var mongoose = require('mongoose');
var moment = require('moment');
var _ = require('lodash');

var currentTime = moment();
var today = moment().startOf('day');
var tomorrow = moment(today).add(1, 'days').add(1, 'hour');

// Filters out events that aren't today.
function filterEvents(results) {
  _.each(results, function(r, index) {
    var events = [];
    _.each(r.obj.events, function(e) {
      var eventIsToday = (e.date >= currentTime.toDate());
      var eventNotTomorrow = (e.date < tomorrow.toDate());

      if (eventIsToday && eventNotTomorrow) {
        events.push(e);
      }
    });

    // Update the results to the filtered r(esult).
    r.obj.events = events;
    results[index] = r;
  });

  return results;
}

exports.findPublicEvent = function(req, res) {
  var locationMissing = (req.user.home_location === null || req.user.home_location === undefined);
  if (locationMissing) return res.send({ error: 'missing location' });

  var coords = {
    type: 'Point',
    coordinates: []
  };
  var query = {
    private: false,
    members: { $nin: [req.user._id] },
    'events.date': { $gte: currentTime.toDate(), $lt: tomorrow.toDate()}
  };
  var options = { spherical: true, maxDistance: 10000, query: query};

  var userPassedLocation = (req.query.user_location !== null && req.query.user_location !== undefined);
  if (userPassedLocation) {
    coords.coordinates = [Number(req.query.user_location[0]), Number(req.query.user_location[1])];
  }
  else {
    coords.coordinates = req.user.home_location.coordinates;
  }

  Group.geoNear(coords, options, function(err, results, stats) {
    var noResults = (err || results === null || results.length === 0);
    if (noResults) return res.send({ user: coords, message: "no events found" });

    results = filterEvents(results);

    return res.send({ user: coords, results: results });
  });
};