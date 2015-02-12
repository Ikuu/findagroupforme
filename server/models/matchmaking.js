/**
	Registering interest in forming a group.
*/

var mongoose = require('mongoose');

var MatchmakingSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	location: [{
		type: Number,
		required: true
	}, {
		type: Number,
		required: true
	}],
	interest: {
		type: String,
		required: true
	},
	date_added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Matchmaking', MatchmakingSchema);