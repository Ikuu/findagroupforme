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