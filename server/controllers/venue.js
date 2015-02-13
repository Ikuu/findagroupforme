// Testing geo-spatial
var Venue = require('../models/venue');
var mongoose = require('mongoose');

exports.test = function(req, res) {
	var homeCoords = { type: "Point", coordinates: [-4.427356, 55.896058] };
	var options = { spherical: true };

	Venue.geoNear(homeCoords, options, function(err, results, stats) {
		return res.send(results);
	});
};