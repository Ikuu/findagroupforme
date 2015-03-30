var User = require('../../models/user');
var Group = require('../../models/group');
var mongoose = require('mongoose');
var moment = require('moment');

exports.findPublicEvent = function(req, res) {
	var locationMissing = (req.user.home_location === null || req.user.home_location === undefined);
	if (locationMissing) return res.send({ error: 'missing location' });
	var currentTime = moment();
	var today = moment().startOf('day');
	var tomorrow = moment(today).add(1, 'days').add(1, 'hour');

	var coords = { 
		type: req.user.home_location.type,
		coordinates: req.user.home_location.coordinates
	};

	var query = {
		private: false,
		members: { $nin: [req.user._id] },
		'events.date': { $gte: currentTime.toDate(), $lt: tomorrow.toDate()}
	};

	var options = { spherical: true, maxDistance: 10000, query: query};

	Group.geoNear(coords, options, function(err, results, stats) {
		var noResults = (err || results === null || results.length === 0);
		if (noResults) return res.send({ error: "no events found" });
		return res.send({ results: results });
	});
};