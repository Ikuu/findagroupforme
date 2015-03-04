// Needs to be cleaned up

var _ 				=	require('underscore');
var schedule 		=	require('node-schedule');
var Matchmaking 	=	require('../../models/matchmaking');
var User 			=	require('../../models/user');
var TempGroup 		=	require('../../models/temp.group');

var removeOldEntries = schedule.scheduleJob('0 * * * *', function() {
	console.log('Deleting Old TempGroups');
	var cutOffDate = new Date();
	cutOffDate.setDate(cutOffDate.getDate() - 7);
	var query = { date_created: { $lte: cutOffDate } };

	TempGroup.find(query).exec(function(err, group) {
		_.each(group, function(data) {
			TempGroup.findByIdAndRemove(data._id, function(err, group) {
				group.remove();
			});
		});
	});
});

exports.find = function(req, res) {
	var homeCoords = { type: "Point", coordinates: [-4.427356, 55.896058] };
	var filter = {};
	var options = { spherical: true, query: filter };

	Matchmaking.geoNear(homeCoords, options, function(err, results, stats) {
		var noMatches = (err || results === null || results.length === 0);
		if (noMatches) {
			return res.send({ message: "no match" });
		}
		return res.send({ results: results, stats: stats });
	});
};

exports.findAllMatchesForUser = function(req, res) {
	Matchmaking.find({ user_id: req.user._id }).exec(function(err, matches) {
		return res.send(matches);
	});
};

exports.deleteMatch = function(req, res) {
	console.log(req.params);
	Matchmaking.findOne({ _id: req.params.id }).exec(function(err, match) {
		match.remove();
	});
};

// Main Function called
exports.findMatch = function(req, res) {
	console.log(req.body);
	var GROUP_SIZE = 2;
	var MAX_DISTANCE = 10000;
	var coords = { 
		type: req.user.home_location.type,
		coordinates: req.user.home_location.coordinates
		};

	var filter = { interest: req.body.interest, pending: false };
	var options = { spherical: true, maxDistance: MAX_DISTANCE, query: filter };
	var users = []; 

	var newMatch = new Matchmaking({
		user_id: req.user._id,
		location: {
			type: req.user.home_location.type,
			coordinates: req.user.home_location.coordinates
		},
		interest: req.body.interest
	});

	Matchmaking.create(newMatch, function(err, match) {
		Matchmaking.geoNear(coords, options, function(err, results, stats) {
			var noMatch = (results === null || results.length < GROUP_SIZE);
	
			if (noMatch) {
				return res.send({ message: "not enough matches to make group" });
			}
			else {
				var newTempGroup = new TempGroup({
					interest: req.body.interest,
					users: []
				});
	
				_.each(results, function(doc) {
					users.push(doc.obj.user_id);
					newTempGroup.users.push({ user_id: doc.obj.user_id });
				});
	
				// Might be able to move this out, or into a function
				var mmQuery = { 'user_id': { $in: users }, 'interest': req.body.interest };
				var mmUpdate = { 'pending': true };
				Matchmaking.update(mmQuery, mmUpdate, { multi: true }, function(err) {
				});
	
				TempGroup.create(newTempGroup);
	
				var userQuery = { '_id': { $in: users } };
				var userMessage = "A group has been found for "+ req.body.interest +" and here is an INSERT_LINK";
				var userUpdate = { $push : { 'messages': { 'text': userMessage } } };
				User.update(userQuery, userUpdate, { multi: true }, function(err) {});
	
				// Probably want to return an object here, or more.
				return res.send({ message: "temp group has been made, and messages sent." });
			}
		});
	});
};

// Need button to reject and remove from matchmaking.
exports.testFunc = function(req, res) {
	TempGroup.findByIdAndRemove(req.params.id, function(err, group) {
		if (err || group === null) return res.send({ message: "something wrong" });
		else {
			group.remove(); // to trigger middleware
			res.send('made');
		}
	});
};