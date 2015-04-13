'use strict';

require('../../../config');
var should = require('should');
var mongoose = require('mongoose');
var PublicApiController = require('../../../../server/controllers/public_api/public.api');
var User = require('../../../../server/models/user');
var Group = require('../../../../server/models/group');

var req, res;
var user, user2;
var group, group2;

describe("PublicApiController Unit Tests", function() {
	before(function(done) {
		user = new User({
			username: "Ikuu",
			name: "Test User",
			password: "1",
			groups: [],
			home_location: {
				type: "Point",
				coordinates: [-4.356888757324214, 55.899691421659476]
			},
			api: {
				key: "d6d92bc817af33d160739552d0a7c2c1",
				project: "Test Project",
				date_added: "2015-04-13T13:04:37.888Z"
			}
		});

		user2 = new User({
			username: "Test User",
			name: "Test User",
			password: "1",
			home_location: {
				type: "Point",
				coordinates: [-4.356888757324214, 55.899691421659476]
			},
			api: {
				key: "af33dd0a7c2c1160739552d6d92bc817",
				project: "Test Project #2",
				date_added: "2015-04-13T13:04:37.888Z"
			}
		});

		group = new Group({
			name: "Test Judo Group",
			interest: "judo",
			location: {
				type: 'Point',
				coordinates: [-4.449443, 55.9039468]
			},
			members: []
		});

		group2 = new Group({
			name: "Test Soccer Group",
			interest: "soccer",
			private: true,
			members: [],
			location: {
				type: 'Point',
				coordinates: [-4.449067, 55.85723],
			}
		});

		user.groups.push(group._id);
		user.groups.push(group2._id);
		group.members.push(user._id);
		group2.members.push(user._id);

		user.save();
		user2.save();
		group.save();
		group2.save();

		done();
	});

	describe("Users Unit Tests", function() {
		it("should return a list of all the users", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.findAllUsers(req, res);
	
			setTimeout(function() {
				res._body.length.should.be.exactly(2);
				should.not.exist(res._body[0].password);
				done();
			}, 200);
		});
	});

	describe("User/:id Unit Tests", function() {
		it("should return user with username Ikuu", function(done) {
			req = {
				params: {
					user_id: user._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.findUser(req, res);
	
			setTimeout(function() {
				res._body.username.should.be.exactly('Ikuu');
				res._body.groups[0].interest.should.be.exactly('judo');
				should.not.exist(res._body.password);
				done();
			}, 200);
		});

		it("should return error if user id is not found", function(done) {
			req = {
				params: {
					user_id: '54bd693719aee30000967768'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.findUser(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('user does not exist');
				done();
			}, 200);
		});
	});

	describe("Groups Unit Tests", function() {
		it("should return a list of all the groups", function(done) {
			req = {};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.findAllGroups(req, res);
	
			setTimeout(function() {
				res._body.length.should.be.exactly(2);
				res._body[0].interest.should.be.exactly('judo');
				done();
			}, 200);
		});
	});

	describe("Group/:id Unit Tests", function() {
		it("should return group with interest Judo", function(done) {
			req = {
				params: {
					group_id: group._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.findGroup(req, res);
	
			setTimeout(function() {
				res._body.private.should.be.exactly(false);
				res._body.interest.should.be.exactly('judo');
				done();
			}, 200);			
		});

		it("should fail to return group with invalid id", function(done) {
			req = {
				params: {
					group_id: user._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.findGroup(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('invalid group id');
				done();
			}, 200);
		});
	});

	describe("APIUser Unit Tests", function() {
		it("should return user with username Ikuu", function(done) {
			req = {
				header: {
					api_key: user.api.key
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };

			PublicApiController.apiUserProfile(req, res);
	
			setTimeout(function() {
				res._body.username.should.be.exactly('Ikuu');
				res._body.groups[0].interest.should.be.exactly('judo');
				should.not.exist(res._body.password);
				done();
			}, 200);			
		});

		it("should return error if no user found", function(done) {
			req = {
				header: {
					api_key: 'notarealkey'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };

			PublicApiController.apiUserProfile(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('user not found');
				done();
			}, 200);			
		});
	});

	describe("APIUserGroups Unit Tests", function() {
		it("should return groups for username Ikuu", function(done) {
			req = {
				header: {
					api_key: user.api.key
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.apiUserGroups(req, res);
	
			setTimeout(function() {
				res._body.length.should.be.exactly(2);
				res._body[0].interest.should.be.exactly('judo');
				done();
			}, 200);
		});

		it("should return error if user has no groups", function(done) {
			req = {
				header: {
					api_key: user2.api.key
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.apiUserGroups(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('user has no groups');
				done();
			}, 200);
		});

		it("should return error if api key is invalid", function(done) {
			req = {
				header: {
					api_key: 'user2.api.key'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.apiUserGroups(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('user not found');
				done();
			}, 200);
		});
	});

	after(function(done) {
		User.remove().exec();
		Group.remove().exec();
		done();
	});
});