'use strict';

require('../../config');
var should = require('should');
var mongoose = require('mongoose');
var User = require('../../../server/models/user');

var user, user2;

describe('User Model Unit Tests:', function(){
	before(function(done){
		user = new User({
			username: "Ikuu",
			name: "Test User",
			home_location: {
				type: "Point",
				coordinates: [-4.356888757324214, 55.899691421659476]
			}
		});

		user2 = new User({
			username: "Ikuu",
			name: "Test User",
			home_location: {
				type: "Point",
				coordinates: [-4.356888757324214, 55.899691421659476]
			}
		});

		done();
	});

	it('Should begin with no Users', function(done){
		User.find({}, function(err, users){
			users.should.have.length(0);
			done();
		});
	});

	it('Should save', function(done){
		user.save(done);
	});

	it('Should fail to save an existing User', function(done) {
		user.save();
		return user2.save(function(err) {
			should.exist(err);
			done();
		});
	});

	it('Should error when saving with no username', function(done) {
		user.username = '';
		user.validate(function(err) {
			if (err) {
				should.exist(err);
				done();
			}
			else {
				user.save();
				done();
			}
		});
	});

	it('Should remove', function(done){
		user.remove(done);
	});

	after(function(done){
		User.remove().exec();
		done();
	});
});