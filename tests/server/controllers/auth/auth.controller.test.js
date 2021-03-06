'use strict';

require('../../../config');
var should = require('should');
var AuthController = require('../../../../server/controllers/auth/auth');

var req, res, next, nextCalled;

describe("Auth Controller Unit Tests:", function() {
	describe("checkIfLoggedIn() Unit Tests", function() {
		beforeEach(function(done) {
			nextCalled = false;
			done();
		});

		it("should return 401 Status Code", function(done) {
			req = {
				session:{
					passport: {
						user: null
					}
				}
			};
			res = {_status: null, _body: null, render: function() { 'noop'; } };
			res.sendStatus = function(status) {res._status = status};
			res.send = function(body) { res._body = body; };
			next = function() {nextCalled = true};
	
			AuthController.checkIfLoggedIn(req, res, next);
	
			setTimeout(function() {
				res._status.should.be.exactly(401);
				done();
			}, 200);
		});
	
		it("should move onto next()", function(done) {
			req = {
				session:{
					passport: {
						user: "ikuu"
					}
				}
			};
			res = {_status: null, _body: null, render: function() { 'noop'; } };
			res.sendStatus = function(status) {res._status = status};
			res.send = function(body) { res._body = body; };
			next = function() {nextCalled = true};
	
			AuthController.checkIfLoggedIn(req, res, next);
	
			setTimeout(function() {
				nextCalled.should.be.exactly(true);
				done();
			}, 200);
		});
	});

	describe("checkIfCorrectUser() Unit Tests", function() {
		beforeEach(function(done) {
			nextCalled = false;
			done();
		});
		
		it("should return 401 Status Code", function(done) {
			req = {
				body: {
					_id: "5473777e753bbfdc8b654470"
				},
				session:{
					passport: {
						user: null
					}
				}
			};
			res = {_status: null, _body: null, render: function() { 'noop'; } };
			res.sendStatus = function(status) {res._status = status};
			res.send = function(body) { res._body = body; };
			next = function() {nextCalled = true};
	
			AuthController.checkIfCorrectUser(req, res, next);
	
			setTimeout(function() {
				res._status.should.be.exactly(401);
				done();
			}, 200);
		});
	
		it("should move onto next()", function(done) {
			req = {
				body: {
					_id: "5473777e753bbfdc8b654470"
				},
				session:{
					passport: {
						user: "5473777e753bbfdc8b654470"
					}
				}
			};
			res = {_status: null, _body: null, render: function() { 'noop'; } };
			res.sendStatus = function(status) {res._status = status};
			res.send = function(body) { res._body = body; };
			next = function() {nextCalled = true};
	
			AuthController.checkIfCorrectUser(req, res, next);
	
			setTimeout(function() {
				nextCalled.should.be.exactly(true);
				done();
			}, 200);
		});	
	});
});