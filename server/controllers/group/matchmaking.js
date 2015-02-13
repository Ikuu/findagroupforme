/*
	Search current matches for one in the area.
	If no matches add to the database
	If match create a group and invite people.
*/

var User = require('../../models/user');
var Group = require('../../models/group');
var Matchmaking = require('../../models/matchmaking');

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

exports.findAllEntries = function(req, res) {
	Matchmaking.find({user_id: req.user._id}).exec(function(err, match) {
		var erro = (err || match === null || match.length === 0);
		if (erro) {
			return res.send({error: "user not found"})
		}
		else {
			return res.send(match);
		}
	});
};