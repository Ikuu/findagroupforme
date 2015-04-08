// Code needs to be cleaned-up
// need to change default co-ords
var _ 				=	require('lodash');
var Group			=	require('../../models/group');
var Matchmaking		=	require('../../models/matchmaking');
var TempGroup 		=	require('../../models/temp.group');
var User			=	require('../../models/user');

exports.findById = function(req, res) {
	TempGroup.findById(req.params.id).exec(function(err, tempGroup) {
		var tempGroupNotFound = (err || tempGroup === null);

		if (tempGroupNotFound) return res.send({ error: "temp group not found" });
		return res.send(tempGroup);
	});
};

function checkIfGroupIsToBeMade(req, res) {
	TempGroup.findById(req.params.id).exec(function(err, tGroup) {
		var makeGroup = 0;
		var users = [];

		_.each(tGroup.users, function(user) {
			if (user.accepted === true) {
				makeGroup++;
				users.push(user.user_id);
			}
		});

		if (makeGroup >= tGroup.users.length) {
			var group = new Group({
				name: 'Generated ' + tGroup.interest + ' Group',
				description: 'This group has been created by the Matchmaking system',
				interest: tGroup.interest,
				owner: users[0],
				members: users,
				location: {
					type: 'Point',
					coordinates: [req.user.home_location.coordinates[0], req.user.home_location.coordinates[1]]
				}
			});
			group.save(function(err) {
				console.log(err);
				// probably want rest of code in here, if err then don't do anything else.
			});

			var userQuery = { '_id': { $in: users } };
			var userMessage = "A group has been formed, <a href=\'./#/groups/" + group._id + "\'>click here<\/a> to view more.";
			var userUpdate = { $push : { 'messages': { sender: 'The Matchmaking Service', 'text': userMessage }, 'groups': group._id } };
			User.update(userQuery, userUpdate, { multi: true }, function(err) {});

			var mmQuery = { 'user_id': { $in: users }, 'interest': tGroup.interest};
			Matchmaking.find(mmQuery).exec(function(err, matches) {
				matches.forEach(function(match) {
					match.remove();
				});
			});

			TempGroup.remove({ '_id': req.params.id }).exec(function(err) {
			});

			// might want to pass group details here
			return res.send({ message: 'group formed' });
		}
		else {
			return res.send({ message: "invite accepted" });
		}
	});
}

exports.acceptInvite = function(req, res) {
	var query = { _id: req.params.id, "users.user_id": req.user._id };
	var update = { $set: { "users.$.accepted": 'true' } };

	TempGroup.update(query, update, function(err, tempGroup) {
		var tempGroupNotFound = (err || tempGroup.n === 0);
		if (tempGroupNotFound) {
			return res.send({ error: 'tempgroup not found'});
		}
		else {
			checkIfGroupIsToBeMade(req, res);		
		}
	});
};

exports.declineInvite = function(req, res) {
	var query = { _id: req.params.id, "users.user_id": req.user._id };
	var update = { $set: { "users.$.accepted": 'false' } };

	TempGroup.update(query, update, function(err, tempGroup) {
		var tempGroupNotFound = (err || tempGroup.n === 0);
		if (tempGroupNotFound) return res.send({ error: 'invite could not be declined' });
		return res.send({ message: "invite declined" });
	});
};