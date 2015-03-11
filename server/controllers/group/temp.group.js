var TempGroup 		=	require('../../models/temp.group');

exports.findById = function(req, res) {
	TempGroup.findById(req.params.id).exec(function(err, tempGroup) {
		if (err || tempGroup === null) return res.send({ message: "error" });
		return res.send(tempGroup);
	});
};

exports.acceptInvite = function(req, res) {
	// Update entry to set accepted to true
	// Still need to check if group is full and then make
	TempGroup.update({ _id: req.params.id, "users.user_id": req.user._id}, { $set: { "users.$.accepted": 'true' }}, function(err, tempGroup) {
		return res.send(tempGroup);
	});
};

exports.declineInvite = function(req, res) {
	// Update entry to set accepted to false
	TempGroup.update({ _id: req.params.id, "users.user_id": req.user._id}, { $set: { "users.$.accepted": 'false' }}, function(err, tempGroup) {
		return res.send(tempGroup);
	});
};