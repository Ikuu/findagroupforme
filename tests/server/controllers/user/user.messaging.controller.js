'use strict';

require('../../../config');
var should = require('should');
var User = require('../../../../server/models/user');
var MessagingController = require('../../../../server/controllers/user/user.messaging');

var user, req, res;

describe('UserMessagingController Unit Tests:', function() {
	before(function(done) {
		user = new User({
			username: "Ikuu",
			name: "Test User",
			messages: [{
				sender: "The Testing Service",
				text: "This is a test message."
			}]
		});

		user.save();
		done();
	});

	describe("markAsViewed Unit Tests", function() {
		it("should mark the message as unviewed", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					id: user.messages[0]._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.markAsViewed(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('message has been marked as viewed');
				done();
			}, 200);
		});

		it("should fail to mark message that does not exist", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					id: '550ee559279e5b04cfda8b3c'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.markAsViewed(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('message does not exist');
				done();
			}, 200);
		});
	});

	describe("markAsUnviewed Unit Tests", function() {
		it("should mark the message as unviewed", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					id: user.messages[0]._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.markAsUnviewed(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('message has been marked as unviewed');
				done();
			}, 200);
		});

		it("should fail to mark message that does not exist", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					id: '550ee559279e5b04cfda8b3c'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.markAsUnviewed(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('message does not exist');
				done();
			}, 200);
		});
	});

	describe("deleteMessage Unit Tests", function() {
		it("should delete the message", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					id: user.messages[0]._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.deleteMessage(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('message was deleted');
				done();
			}, 200);
		});

		it("should fail to delete message that does not exist", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					id: user.messages[0]._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			MessagingController.deleteMessage(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('could not delete message');
				done();
			}, 200);
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});