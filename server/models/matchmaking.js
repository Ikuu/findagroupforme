/**
	Registering interest in forming a group.
*/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var MatchmakingSchema = mongoose.Schema({
	user_id: {
		type: ObjectId,
		required: true
	},
	location: {
		type: { type: String },
		coordinates: [Number, Number]
	},
	interest: {
		type: String,
		required: true
	},
	date_added: {
		type: Date,
		default: Date.now
	}
});

MatchmakingSchema.index({ location: '2dsphere'});

module.exports = mongoose.model('Matchmaking', MatchmakingSchema);