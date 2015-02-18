'use strict';

require('../../config');
var should = require('should');
var mongoose = require('mongoose');
var MatchmakingController = require('../../../server/controllers/group/matchmaking');
var Matchmaking = require('../../../server/models/matchmaking');

var match, req, res;

describe("Matchmaking Controller Unit Tests:", function() {
	before(function(done) {
		match = new Matchmaking({
			user_id: "547b6252ee09fef8405d1834",
			interest: "soccer",
			location: {
				type: "Point",
				coordinates: [-4.571489, 55.879622]
			}
		});

		//match.save();
		done();
	});

	describe("addRecord Unit Tests", function() {
		it("should add new record to database", function(done) {
			req = {
				user: {
					_id: '547b6252ee09fef8405d1834'
				},
				body: {
					interest: 'soccer',
					location: {
						type: "Point",
						coordinates: [-4.571489, 55.879622]
					}
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.addRecord(req, res);
	
			setTimeout(function() {
				res._body.should.have.property('_id');
				res._body.interest.should.be.exactly('soccer');
				done();
			}, 200);
		});

		it("should fail to add duplicate entry", function(done) {
			req = {
				user: {
					_id: '547b6252ee09fef8405d1834'
				},
				body: {
					interest: 'soccer',
					location: {
						type: "Point",
						coordinates: [-4.571489, 55.879622]
					}
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.addRecord(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('missing infromation');
				done();
			}, 200);
		});
	});

	// Need to be re-done for new function
	describe("find Unit Tests", function() {
		it("should find all entries for a user", function(done) {
			req = {
				user: {
					_id: '547b6252ee09fef8405d1834'
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.find(req, res);
	
			setTimeout(function() {
				res._body.should.be.an.Object;
				done();
			}, 200);
		});

		it("should return error if invalid user id", function(done) {
			req = {
				user: {
					_id: '09fef8405d1834547b6252ee'
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.find(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('no match');
				done();
			}, 200);
		});
	});

	describe("findMatch Unit Tests", function() {
		it("should not find a match", function(done) {
			done();
		});
	});

	after(function(done) {
		Matchmaking.remove().exec();
		done();
	});
});