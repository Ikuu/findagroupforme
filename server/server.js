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

var group = require('./routes/group');
var user = require('./routes/user');

// Application
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/groups/', group);
app.use('/api/users/', user);

require('./config/passport')(passport); // pass passport for configuration

// move this to another file
mongoose.connect('mongodb://192.168.1.64/honoursTest');
//mongoose.connect('mongodb://localhost/honoursTest');

// Passport Tutorial stuff, change.
app.use(session({secret: '<mysecret>', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./routes/auth.js')(app, passport);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});