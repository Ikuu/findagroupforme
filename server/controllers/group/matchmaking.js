// Needs to be cleaned up
var _           = require('lodash');
var schedule    = require('node-schedule');
var Matchmaking = require('../../models/matchmaking');
var User        = require('../../models/user');
var TempGroup   = require('../../models/temp.group');

var removeOldEntries = schedule.scheduleJob('0 * * * *', function() {
  var cutOffDate = new Date();
  console.log('Deleting Old TempGroups @ ' + cutOffDate);
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

exports.findAllMatchesForUser = function(req, res) {
  Matchmaking.find({ user_id: req.user._id }).exec(function(err, matches) {
    if (err) return res.send({ error: 'could not retrieve current matchmaking entries'});
    return res.send(matches);
  });
};

exports.deleteMatch = function(req, res) {
  Matchmaking.findOne({ _id: req.params.id }).exec(function(err, match) {
    var invalidMatch = (err || match === null);
    if (invalidMatch) {
      return res.send({ error: 'could not remove entry' });
    }
    else {
      match.remove();
      return res.send({ message: 'matchmaking entry removed' });
    }
  });
};

exports.findMatch = function(req, res) {
  var GROUP_SIZE = 2;
  var MAX_DISTANCE = 10000;
  var coords = { 
    type: req.user.home_location.type,
    coordinates: req.user.home_location.coordinates
  };

  var filter = { interest: req.body.interest, pending: false };
  var options = { maxDistance: MAX_DISTANCE, spherical: true, query: filter };
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
      console.log(results);
      var noMatch = (results === null || GROUP_SIZE > results.length);
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
          newTempGroup.users.push({
            user_id: doc.obj.user_id,
            location: {
              type: doc.obj.location.type,
              coordinates: [doc.obj.location.coordinates[0], doc.obj.location.coordinates[1]]
            } 
          });
        });
  
        // Might be able to move this out, or into a function
        var mmQuery = { 'user_id': { $in: users }, 'interest': req.body.interest };
        var mmUpdate = { 'pending': true };
        Matchmaking.update(mmQuery, mmUpdate, { multi: true }, function(err) {
        });
  
        TempGroup.create(newTempGroup);
  
        var userQuery = { '_id': { $in: users } };
        var userMessage = "A group has been found for "+ req.body.interest +", <a href=\'./#/match/" + newTempGroup._id + "\'>click here<\/a> for more information.";
        var userUpdate = { $push : { 'messages': { sender: 'The Matchmaking Service', 'text': userMessage } } };
        User.update(userQuery, userUpdate, { multi: true }, function(err) {});

        return res.send({ 
          message: "temp group has been made, and messages sent.",
          group: newTempGroup
         });
      }
    });
  });
};