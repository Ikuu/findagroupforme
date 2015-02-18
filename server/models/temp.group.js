// Temporary Group For Matchmaking.
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var tempGroupSchema = mongoose.Schema({
	users: [{
		user_id: ObjectId,
		accepted: {
			type: Boolean,
			default: false
		}
	}],
	date_created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('TempGroup', tempGroupSchema);