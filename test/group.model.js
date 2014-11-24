var should = require('should');
var mongoose = require('mongoose');
var Group = require('../server/models/group');

var group;

describe('Group Model Unit Tests:', function(){
	before(function(done){
		group = new Group({
			group: "Ikuu",
		});

		done();
	});

	describe('CRUD', function(){
		it('Should begin with no Groups', function(done){
			Group.find({}, function(err, groups){
				groups.should.have.length(0);
				done();
			});
		});

		it('Should save', function(done){
			group.save(done);
		});

		it('Should update', function(done){
			group.username = "Alex";
			group.save(done);
		});

		it('Should remove', function(done){
			group.remove(done);
		});

		it('Should be empty', function(done){
			Group.find({}, function(err, groups){
				groups.should.have.length(0);
				done();
			});
		})
	});
});