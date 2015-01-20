'use strict';

require('../../config');
var should = require('should');
var mongoose = require('mongoose');
var GroupController = require('../../../server/controllers/group');
var User = require('../../../server/models/user');

var user, user2, groupId, req, res;

describe('Group Controller Unit Tests:', function() {
	before(function(done) {
		user = new User({
			username: "Ikuu"
		});

		user2 = new User({
			username: "Test User"
		});

		user.save();
		user2.save();
		done();
	});

	describe("index() Unit Tests", function() {
		it('Should return no groups', function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			GroupController.index(req, res);
	
			setTimeout(function() {
				res._body.length.should.be.exactly(0);
				done();
			}, 200);
		});
	});

	describe("add() Unit Tests", function() {
		it("should add a group", function(done) {
			req = {
				user: {
					_id: user._id
				},
				body: {
					name: 'Test Group',
					activity: 'football',
					description: 'This is a test group!',
					venue_location: [ '55.879622', '-4.571489' ]
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.add(req, res);
	
			setTimeout(function() {
				groupId = res._body._id;
				res._body.name.should.be.exactly('Test Group')
				res._body.message.should.be.exactly('Received.');
				done();
			}, 200);
		});

		it("should fail to add group that has no valid user creating it", function(done) {
			req = {
				body: {
					name: 'Test Group',
					activity: 'football',
					description: 'This is a test group!',
					venue_location: [ '55.879622', '-4.571489' ]
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.add(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('user does not exist.');
				done();
			}, 200);
		});

		it("should fail to add empty group", function(done) {
			req = {
				user: {
					_id: user._id
				},
				body: {
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.add(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('unable to create group.');
				done();
			}, 200);
		});
	});

	describe("findById() Unit Tests", function() {
		it("should fail to return group with invalid id", function(done) {
			req = {
				params: {
					group_id: ""
				}
			};
			res = { _body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.findById(req, res);
	
			setTimeout(function () {
				res._body.error.should.be.exactly('group could not be found.');
				done();
			}, 200);
		});

		it("should return the group added", function(done) {
			req = {
				params: {
					group_id: groupId
				}
			};
			res = { _body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.findById(req, res);
	
			setTimeout(function () {
				res._body.name.should.be.exactly('Test Group');
				done();
			}, 200);
		});
	});

	describe("update() Unit Tests", function() {
		it("should fail to update group with no id", function(done) {
			req = {
				body: {
					name: 'Test Group',
					activity: 'football',
					description: 'This is a test groupz!',
					venue_location: [ '55.879622', '-4.571489' ]
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.update(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('could not update group.');
				done();
			}, 200);
		});

		it("should update the group details", function(done) {
			req = {
				body: {
					_id: groupId,
					name: 'Test Group',
					activity: 'football',
					description: 'This is a test groupz!',
					venue_location: [ '55.879622', '-4.571489' ]
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.update(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('group has been updated.');
				done();
			}, 200);
		});
	});

	describe("addUserToGroup() Unit Tests", function() {
		it("should add a user to the group", function(done) {
			req = {
				user: {
					_id: user2._id
				},
				params: {
					group_id: groupId
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.addUserToGroup(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('user added to group.');
				done();
			}, 200);
		});	

		it("should fail to add user to group they already belong to", function(done) {
			req = {
				user: {
					_id: user2._id
				},
				params: {
					group_id: groupId
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.addUserToGroup(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('user already belongs to group.');
				done();
			}, 200);
		});
	});

	describe("removeUserFromGroup() Unit Tests", function() {
		it("should remove the user from the group", function(done) {
			req = {
				user: {
					_id: user2._id
				},
				params: {
					group_id: groupId
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.removeUserFromGroup(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('user removed from group.');
				done();
			}, 200);
		});

		it("should fail to remove user from group they don't belong to", function(done) {
			req = {
				user: {
					_id: user2._id
				},
				params: {
					group_id: groupId
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.removeUserFromGroup(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('user does not belong to group.');
				done();
			}, 200);
		});
	});

	describe("delete() Unit Tests", function() {
		it("should fail to delete group with invalid id", function(done) {
			req = {
				params: {
					group_id: "sdfsdf"
				}
			};
			res = { _body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.delete(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('unable to delete group.');
				done();
			}, 200);
		});

		it("should delete the group added", function(done) {
			req = {
				params: {
					group_id: groupId
				}
			};
			res = { _body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.delete(req, res);
	
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