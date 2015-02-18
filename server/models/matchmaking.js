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
	},
	pending: {
		type: Boolean,
		default: false
	}
});

MatchmakingSchema.index({ location: '2dsphere'});
MatchmakingSchema.index({ user_id: 1, interest: 1 }, { unique: true });

module.exports = mongoose.model('Matchmaking', MatchmakingSchema);