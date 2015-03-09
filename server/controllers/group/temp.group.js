var TempGroup 		=	require('../../models/temp.group');

exports.findById = function(req, res) {
	TempGroup.findById(req.params.id).exec(function(err, tempGroup) {
		res.send(tempGroup);
	});
};

exports.acceptInvite = function(req, res) {
	// Update entry to set accepted to true
};

exports.declineInvite = function(req, res) {
	// Update entry to set accepted to false
};