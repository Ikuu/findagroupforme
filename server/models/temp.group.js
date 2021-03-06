// Temporary Group For Matchmaking.
var _           = require('lodash');
var mongoose    = require('mongoose');
var Matchmaking = require('./matchmaking');
var ObjectId    = mongoose.Schema.Types.ObjectId;

var tempGroupSchema = mongoose.Schema({
  interest: String,
  users: [{
    user_id: ObjectId,
    location: {
      type: { type: String },
      coordinates: [Number, Number]
    },
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
  next();
});

tempGroupSchema.pre('remove', function(next) {
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