var mongoose = require('mongoose');

var venueSchema = mongoose.Schema({
	name: String,
	type: String,
	location: {
		type: { type: String },
		coordinates: [Number, Number]
	}
});

venueSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Venue', venueSchema);