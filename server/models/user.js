var mongoose = require('mongoose');
var hat = require('hat');
var ObjectId = mongoose.Schema.Types.ObjectId;

// Might want move social networks into their own array
var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
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
	interests: [String],
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
	home_location: {
		type: { type: String },
		coordinates: [Number, Number]
	},
	groups: [{ type: ObjectId, ref: 'Group' }],
	private: {
		type: Boolean,
		default: false
	},
	messages: [{
		sender: String,
		text: String,
		date: {
			type: Date,
			default: Date.now
		},
		viewed: {
			type: Boolean,
			default: false
		}
	}],
	api: {
		key: String,
		project: String,
		date_added: Date
	}
});

userSchema.methods.generateApiKey = function(projectName, callback) {
	if (this.api.key === undefined) {
		this.api = {
			key: hat(),
			project: projectName,
			date_added: Date.now()
		};

		return this.save(callback);
	}
}

userSchema.methods.generateNewApiKey = function(callback) {
	this.api.key = hat();
	return callback;
}

userSchema.index({ home_location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);