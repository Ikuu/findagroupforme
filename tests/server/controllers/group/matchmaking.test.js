'use strict';

require('../../../config');
var should = require('should');
var mongoose = require('mongoose');
var MatchmakingController = require('../../../../server/controllers/group/matchmaking');
var Matchmaking = require('../../../../server/models/matchmaking');
var User = require('../../../../server/models/user');

var match, match2, req, res;

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

		match2 = new Matchmaking({
			user_id: "54bd693719aee30000967768",
			interest: "soccer",
			location: {
				type: "Point",
				coordinates: [-4.571489, 55.879622]
			}
		});

		match.save();
		match2.save();
		done();
	});

	describe("findAllMatchesForUser Tests", function() {
		it("should find all entries for a user", function(done) {
			req = {
				user: {
					_id: '547b6252ee09fef8405d1834'
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.findAllMatchesForUser(req, res);
	
			setTimeout(function() {
				res._body[0].interest.should.be.exactly('soccer');
				res._body[0].location.coordinates[0].should.be.exactly(-4.571489);
				res._body[0].location.coordinates[1].should.be.exactly(55.879622);
				done();
			}, 200);
		});

		it("should return empty array if invalid user id", function(done) {
			req = {
				user: {
					_id: '09fef8405d1834547b6252ee'
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.findAllMatchesForUser(req, res);
	
			setTimeout(function() {
				res._body.length.should.be.exactly(0);
				done();
			}, 200);
		});
	});

	describe("findMatch Tests", function() {
		it("should fail to find match, out of range", function(done) {
			req = {
				body: {
					interest: 'soccer'
				},
				user: {
					_id: 'b51483bb1b16754c77c169d9',
					home_location: {
						type: 'Point',
						coordinates: [-7.6075991, 56.1932507]
					}
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.findMatch(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('not enough matches to make group');
				done();
			}, 200);
		});

		it("should matchmake users into a tempgroup", function(done) {
			req = {
				body: {
					interest: 'soccer'
				},
				user: {
					_id: '54c77c169d9b51483bb1b167',
					home_location: {
						type: 'Point',
						coordinates: [-4.571489, 55.879622]
					}
				},
				params: {
					id: match._id
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.findMatch(req, res);
	
			setTimeout(function() {
				res._body.group.users.length.should.be.exactly(3);
				done();
			}, 200);
		});
	});

	describe("deleteMatch Tests", function() {
		it("should delete matchmaking entry", function(done) {
			req = {
				params: {
					id: match._id
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.deleteMatch(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('matchmaking entry removed');
				done();
			}, 200);
		});

		it("should fail to delete matchmaking entry with invalid id", function(done) {
			req = {
				params: {
					id: "547b6252ee09fef8405d1834"
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.deleteMatch(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('could not remove entry');
				done();
			}, 200);
		});
	});

	after(function(done) {
		Matchmaking.remove().exec();
		User.remove().exec();
		done();
	});
});