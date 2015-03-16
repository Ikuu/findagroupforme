var User = require('../../models/user');

exports.addInterest = function(req, res) {
	var interestQuery = { $push: { 'activities': req.params.interest } };
	User.update({ _id: req.user._id }, interestQuery, function(err, user) {
		res.send(user);
	});
};

exports.removeInterest = function(req, res) {
	var interestQuery = { $pull: { 'activities' : req.params.interest } }
	User.update({ _id: req.user._id }, interestQuery, function(err, user) {
		res.send(user);
	});
};