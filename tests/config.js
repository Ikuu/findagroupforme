var dbConfig = require('./../server/config/db');
var mongoose  = require('mongoose');

// Connect to the database
mongoose.connect(dbConfig.testDBUrl);