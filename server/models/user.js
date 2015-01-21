var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: 'error message'
	},
	address: {
		street: String, 
		city: String,
		post_code: String,
		country: String
	},
	email: {
		type: String,
		lowercase: true
	},
	password: {
		type: String
	},
	date_of_birth: Date,
	date_registered: {
		type: Date,
		default: Date.now
	},
	activities: [String],
	twitter: {
		id: Number,
		username: String,
		displayName: String,
		photos: [{
			value: String
		}]
	},
	facebook: {
		id: Number,
		name: String,
		email: String,
		token: String
	},
	google: {
		id: Number,
		name: String,
		email: String,
		token: String
	},
	home_location: [Number, Number],
	current_location: [Number, Number],
	groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
	privacy: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('User', userSchema);