// Add function to auth to make sure user has address fille
var User = require('../../models/user');
var Group = require('../../models/group');

exports.index = function(req, res) {
  User
    .find()
    .select('-salt -password -strategy -messages')
    .populate('groups', 'name interest')
    .exec(function (err, user) {
      if (err) return res.send({ error: "could not return users" });
      res.send(user);
    });
};

exports.findById = function(req, res) {
  User
    .findOne({ _id: req.params.user_id })
    .select('-salt -password -strategy -messages')
    .populate('groups', 'name interest')
    .exec(function (err, user) {
      var noUserFound = (err || user === null);
      if (noUserFound) {
        return res.send({ error: "_id supplied was not valid." });
      }
      else if (user.private && !user._id.equals(req.user._id)) {
        return res.send({
          _id: user._id,
          username: user.username,
          private: user.private
        });
      }
      else {
        return res.send(user);
      }
    });
};

exports.add = function(req, res) {
  if (!req.body) {
    return res.send({ error: "could not add user" });
  }

  var userToAdd = new User(req.body);

  User.create(userToAdd, function(err, user) {
    if (err || user === null) return res.send({ error: err });
    return res.send({ message: "user added", user: user });
  });
};

exports.update = function(req, res) {
  if (req.user === undefined) {
    return res.send({ error: "could not update user." });
  }
  else {
    var update = {
      "name": req.body.name,
      "email": req.body.email,
      "private": req.body.private,
      "home_location": req.body.home_location
    };

    User.findOneAndUpdate({ _id: req.user._id }, update, function(err) {
      if (err) return res.send({ "error": err });
      return res.send({ message: "User has been updated" });
    });
  }
};


function passwordValid(p) {
  return (p === null || p === undefined || p.length === 0);
}

exports.changePassword = function(req, res) {
  var currPassword = req.body.currentPassword;
  var newPassword = req.body.newPassword;
  var passwordErr = (passwordValid(currPassword) || passwordValid(newPassword));
  // Might want to move this validation to the Model.
  if (passwordErr) {
    return res.send({ error: "missing password" });
  }
  else {
    User
      .findOne({ _id: req.user._id})
      .exec(function(err, user) {
        if (user.checkPassword(currPassword)) {
          user.changePassword(newPassword)
          return res.send({ message: "password updated", user: user });
        }
        return res.send({ error: "current password is incorrect", user: user });
      });
  }
};

exports.delete = function(req, res) {
  User.findByIdAndRemove(req.params.user_id, function(err, user) {
    if (err || user === null) return res.send({error: "unable to delete id"});
    user.remove();
    res.send({});
  });
};

exports.findNewInterest = function(req, res) {
  User.aggregate({ 
    $match: { interests: { $in: req.user.interests } }
  },
  {
    $unwind : "$interests"
  },
  { 
    $match: { interests: { $nin: req.user.interests } }
  },
  {
    $group: { "_id": "$interests", count: { $sum: 1 } }
  },
  {
    $sort: { count: -1 }
  }).exec(function(err, result) {
    return res.send(result);
  });
};

// Strip Password
exports.findLoggedInUser = function(req, res) {
  User
  .findOne({_id: req.user._id})
  .populate('groups', 'name interest')
  .exec(function (err, user) {
    if (err) return handleError(err);
    res.send(user);
  });
};