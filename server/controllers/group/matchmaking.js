/*
	Add Record to Collection
	Search current matches for one in the area.
	If no matches add to the database
	If match create a group and invite people.

	Run command every hour to check for groups over 72 hours old,
	delete them and set Match pending to false.
*/

var _ = require('underscore');
var Matchmaking = require('../../models/matchmaking');
var User = require('../../models/user');

// Probably want these as functions
exports.addRecord = function(req, res) {
	var newMatch = new Matchmaking({
		user_id: req.user._id,
		interest: req.body.interest,
		location: req.body.location
	});

	Matchmaking.create(newMatch, function(err, match) {
		var matchNotAdded = (err || match === null);

		if (matchNotAdded) {
			return res.send({error: "missing infromation"});
		}
		else {
			return res.send(match);
		}
	});
};

exports.find = function(req, res) {
	var homeCoords = { type: "Point", coordinates: [-4.427356, 55.896058] };
	var filter = {};
	var options = { spherical: true, query: filter};

	Matchmaking.geoNear(homeCoords, options, function(err, results, stats) {
		var noMatches = (err || results === null || results.length === 0);
		if (noMatches) {
			return res.send({message: "no match"});
		}
		return res.send({results: results, stats: stats});
	});
};

// Main Function called
// Create either a temp group collection, or add property to Group
// have page that lets user accept into group, once limit is reached make the group
// need to be careful handling groups if more than 5 people sign up.
exports.findMatch = function(req, res) {
	var GROUP_SIZE = 1;
	var MAX_DISTANCE = 10000;

	var coords = { type: "Point", coordinates: [-4.427356, 55.896058] };
	var filter = { interest: "soccer", pending: false };
	var options = { spherical: true, maxDistance: MAX_DISTANCE, query: filter };

	var users = []; // Users to be invited to form a group

	Matchmaking.geoNear(coords, options, function(err, results, stats) {
		var noMatch = (results === null || results.length < GROUP_SIZE);

		if (noMatch) {
			// add new record to Collection, call addRecord()
			// also add way to deal with error
			return res.send({ message: "not enough matches to make group" });
		}
		else {
			_.each(results, function(doc){
				users.push(doc.obj.user_id);
			});

			var q = { 'user_id': { $in: users }, 'interest': "soccer" };
			Matchmaking.update(q, { 'pending': true }, { multi: true }, function(err) {});

			var qq = { '_id': { $in: users } };
			var update = { $push : { 'messages': { 'text': "auto-group has found you a match." } } }
			User.update(qq, update, { multi: true }, function(err) {});

			return res.send("can make group");
			// Mark entry as pending.
			// Inivte users to form a group

			//return res.send(results);
		}
	});
};