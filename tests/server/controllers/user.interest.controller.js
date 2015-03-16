'use strict';

require('../../config');
var should = require('should');
var InterestController = require('../../../server/controllers/user/user.interest');

var req, res;

describe('UserInterestController Unit Tests:', function() {
	describe("addInterest Unit Tests", function() {
		it("should add interest to the user", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.addInterest(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});

		it("should fail to add interest to the user", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.addInterest(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});
	});

	describe("removeInterest Unit Tests", function() {
		it("should remove interest from the user", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.removeInterest(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});

		it("should fail to remove interest from the user", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			InterestController.removeInterest(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});
	});
});