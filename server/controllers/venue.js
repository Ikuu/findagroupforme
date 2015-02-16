// Testing geo-spatial
var Venue = require('../models/venue');
var mongoose = require('mongoose');

exports.test = test;

// Finds all Shops and returns distance from homeCoords
function test(req, res) {
	var homeCoords = { type: "Point", coordinates: [-4.427356, 55.896058] };
	var filter = { "type": "Shop" };
	var options = { spherical: true, query: filter};

	Venue.geoNear(homeCoords, options, function(err, results, stats) {
		var noMatches = (err || results === null || results.length === 0);
		if (noMatches) {
			return res.send({message: "no match"});
		}
		return res.send({results: results, stats: stats});
	});
}


// Finds all Shops in 2km area, doesn't return distance.
function test2(req, res) {
	var query = {
		"location": {
			"$near": {
				"$geometry": {
					"type": "Point",
					"coordinates": [-4.427356, 55.896058]
				},
				"$spherical": true,
				"$maxDistance": 2000
			}
		},
		"type": "Shop"
	};

	Venue.find(query).exec(function(err, results) {
		return res.send(results);
	});
}

// Polygon of all the users, though might want to just find the edge users and draw a simple shape.

// Search each Collection and stich together. Angular then looks at each array and only shows what was returned.