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

var db = require('./config/db')

// Application
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// move this to another file
mongoose.connect(db.url);
//mongoose.connect('mongodb://localhost/honoursTest');

// Passport Tutorial stuff, change.
app.use(session({
	secret: '<mysecret>',
	store: new MongoStore({
		url: db.url,
	}),
	resave: true,
	saveUninitialized: true
}));
require('./config/passport.js')(passport); // pass passport for configuration
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
app.use('/api/groups/', group);
app.use('/api/users/', user);
require('./routes/auth.js')(app, passport);

// Start App.
app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});