var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

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
	interest: String,
	location: {
		type: { type: String },
		coordinates: [Number, Number]
	},
	owner: {type: ObjectId, ref: 'User'},
	members: [{type: ObjectId, ref: 'User'}],
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
		members_attending: [String]
	}]
});

groupSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Group', groupSchema);