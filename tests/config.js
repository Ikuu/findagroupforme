var dbConfig = require('./../server/config/db');
var mongoose  = require('mongoose');

mongoose.connect(dbConfig.testDBUrl);