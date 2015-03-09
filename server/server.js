// Modules
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var group = require('./routes/group');
var user = require('./routes/user');
var match = require('./routes/match');
var tempGroup = require('./routes/temp.group');

var dbConfig = require('./config/db');

// Application
var app = express();

mongoose.connect(dbConfig.url);
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(session({
	secret: '<mysecret>',
	store: new MongoStore({
		url: dbConfig.url
	}),
	resave: true,
	saveUninitialized: true
}));
require('./config/passport.js')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/groups/', group);
app.use('/api/users/', user);
app.use('/api/match/', match);
app.use('/api/tempGroup', tempGroup);
require('./routes/auth.js')(app, passport);

// Start App.
app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});