var User = require('../../models/user');

exports.addInterest = function(req, res) {
	var interestQuery = { $push: { 'interests': req.params.interest } };
	User.update({ _id: req.user._id }, interestQuery, function(err, user) {
		return res.send({ message: "item added" });
	});
};

exports.removeInterest = function(req, res) {
	var interestQuery = { $pull: { 'interests' : req.params.interest } }
	User.update({ _id: req.user._id }, interestQuery, function(err, user) {
		return res.send({ message: "item deleted" });
	});
};