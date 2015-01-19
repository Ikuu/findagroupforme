'use strict';

require('../../config');
var should = require('should');
var UserController = require('../../../server/controllers/user/user');

var req, res, userID;

describe('UserController Unit Tests:', function() {
	it('should return no users', function(done) {
		req = {};
		res = {_body: null, render: function() { 'noop'; } };
		res.send = function (body) { res._body = body; };

		UserController.index(req, res);

		setTimeout(function() {
			res._body.length.should.be.exactly(0);
			done();
		}, 200);
	});

	// Might want to add a complete user.
	it("should add a user", function(done) {
		req = {
			body: {
				name: "Test User",
				username: "TestUser01",
				address: {
					street: "123 New Street",
					city: "Glasgow",
					post_code: "G2 4PP",
					county: "United Kingdom"
				},
				email: "test@user.com",
				password: "1234",
				date_of_birth: "1980-11-24T18:22:54.062Z",
				current_location: [55.896154, -5.427094],
				home_location: [55.896154, -5.427094]
			}
		};
		res = {_body: null, render: function() { 'noop'; } };
		res.send = function (body) { res._body = body; };

		UserController.add(req, res);

		setTimeout(function() {
			res._body.username.should.be.exactly("TestUser01");
			res._body.should.have.property('_id');
			userID = res._body._id;
			done();
		}, 200);
	});

	it("should return the added user", function(done) {
		req = {
			params: {
				user_id: userID
			}
		};
		res = {_body: null, render: function() { 'noop'; } };
		res.send = function (body) { res._body = body; };

		UserController.findById(req, res);

		setTimeout(function() {
			res._body.username.should.be.exactly("TestUser01");
			done();
		}, 200);
	});

	it("should update the user", function(done) {
		req = {
			user: {
				_id: userID
			},
			body: {
				name: "User Test",
				username: "TestUser01",
				address: {
					street: "123 New Street",
					city: "Glasgow",
					post_code: "G2 4PP",
					county: "United Kingdom"
				},
				email: "test@user.com",
				password: "1234",
				date_of_birth: "1980-11-24T18:22:54.062Z",
				current_location: [55.896154, -5.427094],
				home_location: [55.896154, -5.427094]
			}
		};
		res = {_body: null, render: function() { 'noop'; } };
		res.send = function (body) { res._body = body; };

		UserController.update(req, res);

		setTimeout(function() {
			res._body.message.should.be.exactly('User has been updated');
			done();
		}, 200);
	});

	it("should delete the user", function(done) {
		req = {
			params: {
				user_id: userID 
			}
		};
		res = {_body: null, render: function() { 'noop'; } };
		res.send = function (body) { res._body = body; };

		UserController.delete(req, res);

		setTimeout(function() {
			res._body.should.be.an.Object.and.be.empty;
			done();
		}, 200);
	});
});