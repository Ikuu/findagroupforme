var mongoose = require('mongoose');
var uuid = require('node-uuid');
var ObjectId = mongoose.Schema.Types.ObjectId;
var crypto = require('crypto');
var externalProviders = [
	'twitter',
	'facebook',
	'google'
];

// Might want move social networks into their own array
var UserSchema = mongoose.Schema({
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
		displayName: String
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
	},
	salt: {
		type: String,
		default: ''
	},
	strategy: {
		type: String,
		default: 'local'
	}
});

UserSchema.pre('save', function(next) {
	if (!this.isNew || !this.requireValidation()) return next();
	this.salt = this.makeSalt();
	this.password = this.encryptPassword(this.password);
	next();
});

UserSchema.methods.makeSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

UserSchema.methods.encryptPassword = function(password) {
	return crypto
		.createHmac('sha1', this.salt)
		.update(password)
		.digest('hex');
};

UserSchema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.password;
};

UserSchema.methods.changePassword = function(newPassword) {
	this.password = this.encryptPassword(newPassword);
	this.save();
}

// Checks to see if the account was created using an external provider (FaceBook
// etc.)
UserSchema.methods.requireValidation = function() {
	return !~externalProviders.indexOf(this.strategy);
};

UserSchema.methods.generateApiKey = function(projectName, callback) {
	if (this.api.key === undefined) {
		this.api = {
			key: uuid.v4(),
			project: projectName,
			date_added: Date.now()
		};

		return this.save(callback);
	}
};

UserSchema.methods.generateNewApiKey = function(callback) {
	this.api.key = uuid.v4();
	return this.save(callback);
};

UserSchema.index({ home_location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);