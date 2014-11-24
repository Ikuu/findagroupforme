/*
	Group 2.0
	Attempting to create the 'final' model for a Group. Might want to add more fields.
	Members needs to really be looked at, look at suggestion from Keith.
	Events.members_attending needs to looked at too.
	Might want to just use [long, lat] for co-ords, no need for a sub-document.
*/
var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
	name: String,
	date_created: {type: Date, default: Date.now},
	activity: String,
	venue_location: [Number, Number],
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