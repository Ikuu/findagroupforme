'use strict';

require('../../config');
var should = require('should');
var MessagingController = require('../../../server/controllers/user/user.messaging');

var req, res;

describe('UserMessagingController Unit Tests:', function() {
	describe("markAsUnviewed Unit Tests", function() {
		it("should mark the message as unviewed", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.markAsUnviewed(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});

		it("should fail to mark message that does not exist", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.markAsUnviewed(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});
	});

	describe("markAsViewed Unit Tests", function() {
		it("should mark the message as unviewed", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.markAsViewed(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});

		it("should fail to mark message that does not exist", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.markAsViewed(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});
	});

	describe("deleteMessage Unit Tests", function() {
		it("should delete the message", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.deleteMessage(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});

		it("should fail to delete message that does not exist", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.deleteMessage(req, res);
	
			setTimeout(function() {
				done();
			}, 200);
		});
	});
});