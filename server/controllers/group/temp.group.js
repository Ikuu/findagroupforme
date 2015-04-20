// Code needs to be cleaned-up
// need to change default co-ords
var _             = require('lodash');
var Group         = require('../../models/group');
var Matchmaking   = require('../../models/matchmaking');
var TempGroup     = require('../../models/temp.group');
var User          = require('../../models/user');

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
    var latSum = 0;
    var longSum = 0;

    _.each(tGroup.users, function(user) {
      if (user.accepted === true) {
        makeGroup++;
        users.push(user.user_id);
        latSum += user.location.coordinates[0];
        longSum += user.location.coordinates[1];
      }
    });

    if (makeGroup >= tGroup.users.length) {
      latSum = latSum / tGroup.users.length;
      longSum = longSum / tGroup.users.length;

      var group = new Group({
        name: 'Generated ' + tGroup.interest + ' Group',
        description: 'This group has been created by the Matchmaking system',
        interest: tGroup.interest,
        owner: users[0],
        members: users,
        location: {
          type: 'Point',
          coordinates: [latSum, longSum]
        }
      });
      group.save(function(err) {
        // probably want rest of code in here, if err then don't do anything else.
      });

      // Move all these to seperate functions.
      // Message users informing them group made
      var userQuery = { '_id': { $in: users } };
      var userMessage = "A group has been formed, <a href=\'./#/groups/" + group._id + "\'>click here<\/a> to view more.";
      var userUpdate = { $push : { 'messages': { sender: 'The Matchmaking Service', 'text': userMessage }, 'groups': group._id } };
      User.update(userQuery, userUpdate, { multi: true }, function(err) {});

      // Clean up matchmaking entries now that group has been created
      var mmQuery = { 'user_id': { $in: users }, 'interest': tGroup.interest};
      Matchmaking.find(mmQuery).exec(function(err, matches) {
        matches.forEach(function(match) {
          match.remove();
        });
      });

      // Remove Temp.Group now that group has been created.
      TempGroup.remove({ '_id': req.params.id }).exec(function(err) {
      });

      // might want to pass group details here
      return res.send({ message: 'group formed', group: group });
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
    if (tempGroupNotFound) return res.send({ error: "invite could not be declined" });
    return res.send({ message: "invite declined" });
  });
};