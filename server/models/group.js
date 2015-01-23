/*
	Events.members_attending needs to looked at too.
*/
var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: 'error message'
	},
	description: String,
	date_created: {type: Date, default: Date.now},
	private: {
		type: Boolean,
		default: false
	},
	activity: String,
	venue_location: [Number, Number],
	owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	posts: [{
		username: String,
		date_posted: {type: Date, default: Date.now},
		text: String,
		images: [{
			name: String,
			description: String,
			url: String
		}]
	}],
	events: [{
		name: String,
		description: String,
		date: Date,
		location: [Number, Number],
		members_attending: [String]
	}]
});

groupSchema.pre('save', function (next) {
	next();
});

groupSchema.pre('remove', function (next) {
	next();
});

module.exports = mongoose.model('Group', groupSchema);