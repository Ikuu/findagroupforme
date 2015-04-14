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