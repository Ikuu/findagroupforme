var should = require('should');
var mongoose = require('mongoose');
var User = require('../server/models/user');

var user;

mongoose.connect('mongodb://localhost/findagroupforme-test');

describe('User Model Unit Tests:', function(){
	before(function(done){
		user = new User({
			username: "Ikuu"
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

	it('Should update', function(done){
		user.username = "Alex";
		user.save(done);
	});

	it('Should remove', function(done){
		user.remove(done);
	});

	it('Should be empty', function(done){
		User.find({}, function(err, users){
			users.should.have.length(0);
			done();
		});
	})
});