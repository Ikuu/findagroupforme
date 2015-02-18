'use strict';

require('../../config');
var should = require('should');
var mongoose = require('mongoose');
var TempGroup = require('../../../server/models/temp.group');

var tempGroup;

describe('TempGroup Model Unit Tests:', function() {
	before(function(done) {
		tempGroup = new TempGroup({
			users: [{
				user_id: "54bfbacd0444730000228786"
			},
			{
				user_id: "54c1547635a0f1000069bd20"
			}]
		});

		done();
	});

	it('Should begin with no Groups', function(done) {
		TempGroup.find({}, function(err, groups){
			groups.should.have.length(0);
			done();
		});
	});

	it('Should save', function(done){
		tempGroup.save(done);
	});

	it('Should remove', function(done) {
		tempGroup.remove(done);
	});

	after(function(done) {
		TempGroup.remove().exec();
		done();
	});
});