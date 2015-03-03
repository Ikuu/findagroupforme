// Temporary Group For Matchmaking.
var _ 				=	require('underscore');
var mongoose 		=	require('mongoose');
var ObjectId 		=	mongoose.Schema.Types.ObjectId;
var Matchmaking 	=	require('./matchmaking');

var tempGroupSchema = mongoose.Schema({
	interest: String,
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

tempGroupSchema.pre('save', function(next) {
	console.log("TESTONG");
	next();
});

tempGroupSchema.pre('remove', function(next) {
	console.log("TESTING");
	var mmUsers = [];

	_.each(this.users, function(user) {
		mmUsers.push(user.user_id);
	});

	var mmQuery = { 'user_id': { $in: mmUsers }, 'interest': this.interest };
	var mmUpdate = { 'pending': false };

	Matchmaking.update(mmQuery, mmUpdate, { multi: true }, function(err) {

	});

	next();
});

module.exports = mongoose.model('TempGroup', tempGroupSchema);