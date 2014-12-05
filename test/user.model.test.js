'use strict';

var should = require('should');
var mongoose = require('mongoose');
var User = require('../server/models/user');

var user, user2;

mongoose.connect('mongodb://localhost/findagroupforme-test');

describe('User Model Unit Tests:', function(){
	before(function(done){
		user = new User({
			username: "Ikuu"
		});

		user2 = new User({
			username: "Ikuu"
		});

		done();
	});

	describe('', function(){
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
			return user.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('Should remove', function(done){
			user.remove(done);
		});
	});

	after(function(done){
		User.remove().exec();
		done();
	});
});