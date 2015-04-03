'use strict';

require('../../config');
var should = require('should');
var mongoose = require('mongoose');
var Group = require('../../../server/models/group');

var group, group2;

describe('Group Model Unit Tests:', function() {
	before(function(done) {
		group = new Group({
			name: "Football Group",
			location: {
				coordinates: [-4.4436173, 55.8610314],
				type: "Point"
			}
		});

		group2 = new Group({
			name: "Football Group",
			location: {
				coordinates: [-4.4436173, 55.8610314],
				type: "Point"
			}
		});

		done();
	});

	it('Should begin with no Groups', function(done) {
		Group.find({}, function(err, groups) {
			groups.should.have.length(0);
			done();
		});
	});

	it('Should save', function(done) {
		group.save(function(err){
			done()
		});
	});

	it('Should fail when saving group without a unique name', function(done) {
		group.save();
		return group2.save(function(err) {
			should.exist(err);
			done();
		});
	});

	it('Should error when saving with no name', function(done) {
		group.name = '';
		group.validate(function(err) {
			if (err) {
				should.exist(err);
				done();
			}
			else {
				group.save();
				done();
			}
		});
	});

	it('Should remove', function(done) {
		group.remove(done);
	});

	after(function(done) {
		Group.remove().exec();
		done();
	});
});