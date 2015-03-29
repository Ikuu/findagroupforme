'use strict';

require('../../../config');
var should = require('should');
var User = require('../../../../server/models/user');
var InterestController = require('../../../../server/controllers/user/user.interest');

var user, req, res;

describe('UserInterestController Unit Tests:', function() {
	before(function(done) {
		user = new User({
			username: "Ikuu",
			name: "Test User"
		});

		user.save();
		done();
	});

	describe("addInterest Unit Tests", function() {
		it("should add interest to the user", function(done) {
			req = {
				user: {
					_id: user._id,
				},
				params: {
					interest: 'soccer'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.addInterest(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('item added');
				done();
			}, 200);
		});

		it("should return error if _id is not present", function(done) {
			req = {
				user: {
					_id: '',
				},
				params: {
					interest: 'soccer'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.addInterest(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('item could not be added.');
				done();
			}, 200);
		});
	});

	describe("removeInterest Unit Tests", function() {
		it("should remove interest from the user", function(done) {
			req = {
				user: {
					_id: user._id,
				},
				params: {
					interest: 'soccer'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.removeInterest(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('item deleted');
				done();
			}, 200);
		});

		it("should handle removing interest not in array", function(done) {
			req = {
				user: {
					_id: user._id,
				},
				params: {
					interest: 'golf'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.removeInterest(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('item deleted');
				done();
			}, 200);
		});

		it("should return error if _id is not present", function(done) {
			req = {
				user: {
					_id: '',
				},
				params: {
					interest: 'golf'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.removeInterest(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('item could not be deleted.');
				done();
			}, 200);
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});