// Update, UpdateAddress, and FindNewInterest need updating
'use strict';

require('../../../config');
var should = require('should');
var User = require('../../../../server/models/user');
var UserController = require('../../../../server/controllers/user/user');

var interestUser, interestUser2, req, res, userID;

describe('UserController Unit Tests:', function() {
	before(function(done) {
		interestUser = new User({
			username: "Test User #1",
			name: "Test User #1",
			interests: ["football", "basketball", "rugby", "golf"]
		});

		interestUser2 = new User({
			username: "Test User #2",
			name: "Test User #2",
			interests: ["football", "basketball", "tennis", "golf"]
		});

		interestUser.save();
		interestUser2.save();
		done();
	});

	describe("index Unit Tests", function() {
		it('should return two users', function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.index(req, res);
	
			setTimeout(function() {
				res._body.length.should.be.exactly(2);
				done();
			}, 200);
		});
	});

	describe("add Unit Tests", function() {
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
					current_location: [-5.427094, 55.896154],
					interests: ["football", "basketball"],
					home_location: {
						"type": "Point",
						"coordinates": [-5.427094, 55.896154]
					}
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

	describe("findById Unit Tests", function() {
		it("should return id not valid", function(done) {
			req = {
				params: {
					user_id: '54bfbacd3444730000228786'
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

	describe("update Unit Tests", function() {
		it("should fail to update user with invalid id", function(done) {
			req = {
				body: {
					name: "User Test",
					email: "test@user.com",
					password: "1234",
					private: false
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
					email: "test@user.com",
					password: "1234",
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

	describe("updateAddress Unit Tests", function() {
		it("should update users address", function(done) {
			req = {
				user: {
					_id: userID,
				},
				body: {
					address: {
						street: "1 King Street",
						city: "Paisley",
						post_code: "PA1 2PP",
						country: "United Kingdom"
					},
					home_location: [-4.439222500000028, 55.8440731]
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.updateAddress(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('address has been updated');
				done();
			}, 200);
		});

		it("should fail to update users address if address missing", function(done) {
			req = {
				user: {
					_id: userID,
				},
				body: {
					address: {},
					home_location: [-4.439222500000028, 55.8440731]
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.updateAddress(req, res);
	
			setTimeout(function() {
				console.log(res._body);
				res._body.error.should.be.exactly('address missing');
				done();
			}, 200);
		});

		it("should fail to update users address if home_location is missing", function(done) {
			req = {
				user: {
					_id: userID,
				},
				body: {
					address: {
						street: "1 King Street",
						city: "Paisley",
						post_code: "PA1 2PP",
						country: "United Kingdom"
					},
					home_location: []
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.updateAddress(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('address missing');
				done();
			}, 200);
		});
	});
	
	describe("findNewInterest Unit Tests", function() {
		it("should return interests based on users current interests", function(done) {
			req = {
				user: {
					interests: ["football", "basketball"]
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			UserController.findNewInterest(req, res);
	
			setTimeout(function() {
				res._body[0]._id.should.be.exactly('golf');
				res._body[0].count.should.be.exactly(2);

				res._body[1]._id.should.be.exactly('tennis');
				res._body[1].count.should.be.exactly(1);
				done();
			}, 200);
		});
	});
	
	describe("findLoggedInUser Unit Tests", function() {
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

	describe("delete Unit Tests", function() {
		it("should fail to delete user with invalid id", function(done) {
			req = {
				params: {
					user_id: "54749bcf213fg00000c004b0" 
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

	after(function(done) {
		User.remove().exec();
		done();
	});
});