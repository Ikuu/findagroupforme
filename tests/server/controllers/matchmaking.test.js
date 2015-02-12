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
			location: [55.879622, -4.571489]
		});

		match.save();
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
					location: [55.879622, -4.571489]
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			MatchmakingController.addRecord(req, res);
	
			setTimeout(function() {
				console.log(res._body);
				res._body.should.have.property('_id');
				res._body.interest.should.be.exactly('soccer');
				done();
			}, 200);
		});
	});

	after(function(done) {
		Matchmaking.remove().exec();
		done();
	});
});