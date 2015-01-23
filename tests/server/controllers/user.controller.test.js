'use strict';

require('../../config');
var should = require('should');
var UserController = require('../../../server/controllers/user/user');

var req, res, userID;

describe('UserController Unit Tests:', function() {
	describe("index() Unit Tests", function() {
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
	});

	describe("add() Unit Tests", function() {
		it("should fail to add blank user", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.add(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly("Validation failed")
				done();
			}, 200);
		});

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
					private: true,
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
	});

	describe("findById() Unit Tests", function() {
		it("should return id not valid", function(done) {
			req = {
				params: {
					user_id: "invalid id"
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.findById(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly("_id supplied was not valid.");
				done();
			}, 200);
		});

		it("should return partial user if private is true", function(done) {
			req = {
				user: {
					_id: "547b6252ee09fef8405d1834"
				},
				params: {
					user_id: userID
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.findById(req, res);
	
			setTimeout(function() {
				res._body.username.should.be.exactly("TestUser01");
				res._body.should.not.have.property('name');
				done();
			}, 200);
		});
	
		it("should return the added user", function(done) {
			req = {
				user: {
					_id: userID
				},
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
	});

	describe("update() Unit Tests", function() {
		it("should fail to update user with invalid id", function(done) {
			req = {
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
				res._body.error.should.be.exactly("could not update user.")
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
					home_location: [55.896154, -5.427094],
					private: false
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
	});
	
	describe("findLoggedInUser() Unit Tests", function() {
		it("should return current user logged in", function(done) {
			req = {
				user: {
					_id: userID
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.findLoggedInUser(req, res);
	
			setTimeout(function() {
				res._body.username.should.be.exactly("TestUser01");
				done();
			}, 200);
		});
	});

	describe("delete() Unit Tests", function() {
		it("should fail to delete user with invalid id", function(done) {
			req = {
				params: {
					user_id: "dfsgdfghdfgh" 
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.delete(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly("unable to delete id");
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
});