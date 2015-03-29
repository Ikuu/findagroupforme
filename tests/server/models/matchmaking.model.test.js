'use strict';

require('../../config');
var should = require('should');
var mongoose = require('mongoose');
var Matchmaking = require('../../../server/models/matchmaking');
var TempGroup = require('../../../server/models/temp.group');

var matchmaking;

describe('Matchmaking Model Unit Tests:', function() {
	before(function(done) {
		matchmaking = new Matchmaking({
			user_id: "547b6252ee09fef8405d1834",
			location: {
				type: "Point",
				coordinates: [-4.571489, 55.879622]
			},
			interest: "soccer"
		});

		done();
	});

	it('Should begin with no documents', function(done) {
		Matchmaking.find({}, function(err, match){
			match.should.have.length(0);
			done();
		});
	});

	it('Should save', function(done){
		matchmaking.save(done);
	});

	it('Should error when saving with no user_id', function(done) {
		matchmaking.user_id = '';
		matchmaking.validate(function(err) {
			if (err) {
				should.exist(err);
				done();
			}
			else {
				matchmaking.save();
				done();
			}
		});
	});

	it('Should remove', function(done) {
		matchmaking.remove(done);
	});

	after(function(done) {
		Matchmaking.remove().exec();
		TempGroup.remove().exec();
		done();
	});
});