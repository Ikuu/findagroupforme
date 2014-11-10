var mongoose = require('mongoose');

var venueSchema = mongoose.Schema({
	name: String,
	address: {
		street_name: String, 
		city: String,
		post_code: String,
		country: String
	},
	activities: [String]
});

module.exports = mongoose.model('Venue', venueSchema);