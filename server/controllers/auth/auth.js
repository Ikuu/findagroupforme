var Group = require('../../models/group');
var User = require('../../models/user');

exports.checkIfLoggedIn = function(req, res, next) {
  req.session.passport.user === null ? res.sendStatus(401) : next();
};

// Check to see if the user is modiying the correct User.
exports.checkIfCorrectUser = function(req, res, next) {
  req.session.passport.user !== req.body._id ? res.sendStatus(401) : next();
};

exports.hasGroupPermission = function(req, res, next) {
  Group
    .find({_id: req.body._id, members: req.session.passport.user})
    .exec(function(err, group) {
      group.length === 0 ? res.status(401).end() : next();
    });
};

exports.checkApiKey = function(req, res, next) {
  var apiKey = req.headers.api_key;
  var apiKeyMissing = (apiKey === undefined || apiKey === null)

  if (apiKeyMissing) return res.status(401).end();
  
  User
    .findOne()
    .where('api.key').equals(apiKey)
    .exec(function(err, user) {
      var userNotFound = (err || user === null)
      if (userNotFound) return res.status(401).end();

      // API Key is authorized so we attach the user so it can be used in next
      // stage.
      req.apiUser = user;
      return next();
    });
};