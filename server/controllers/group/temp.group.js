// Code needs to be cleaned-up

var _ 				=	require('underscore');
var Group			=	require('../../models/group');
var Matchmaking		=	require('../../models/matchmaking');
var TempGroup 		=	require('../../models/temp.group');
var User			=	require('../../models/user');


exports.findById = function(req, res) {
	TempGroup.findById(req.params.id).exec(function(err, tempGroup) {
		if (err || tempGroup === null) return res.send({ message: "error" });
		return res.send(tempGroup);
	});
};

function checkIfGroupIsToBeMade(req, res) {
	TempGroup.findById(req.params.id).exec(function(err, tGroup) {
		var makeGroup = 0;
		var users = [];

		_.each(tGroup.users, function(data) {
			if (data.accepted === true) {
				makeGroup++;
				users.push(data.user_id);
			}
		});

		if (makeGroup >= tGroup.users.length) {
			var group = new Group({
				name: 'Generated ' + tGroup.interest + ' Group',
				description: 'This group has been created by the Matchmaking system',
				activity: tGroup.interest,
				owner: users[0],
				members: users
			});
			group.save();

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
		}
		else {
			//console.log('group not made.');
		}
	});
};

exports.acceptInvite = function(req, res) {
	var query = { _id: req.params.id, "users.user_id": req.user._id };
	var update = { $set: { "users.$.accepted": 'true' } };

	TempGroup.update(query, update, function(err, tempGroup) {
		checkIfGroupIsToBeMade(req, res);
		return res.send({ message: "PLACEHOLDER MESSAGE - PLEASE CHANGE" });
	});
};

exports.declineInvite = function(req, res) {
	var query = { _id: req.params.id, "users.user_id": req.user._id };
	var update = { $set: { "users.$.accepted": 'false' } };

	TempGroup.update(query, update, function(err, tempGroup) {
		return res.send({ message: "PLACEHOLDER MESSAGE - PLEASE CHANGE" });
	});
};