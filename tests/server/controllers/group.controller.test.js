require('../../config');
var should = require('should');
var mongoose = require('mongoose');
var GroupController = require('../../../server/controllers/group');
var User = require('../../../server/models/user');

var user, groupId;

describe('Group Controller Unit Tests:', function() {
	before(function(done) {
		user = new User({
			username: "Ikuu"
		});

		user.save(done);
	});

	it('Should return no groups', function(done){
		req = {};
		res = {_body: null, render: function() { 'noop'; }};
		res.send = function (body) {res._body = body; };

		GroupController.index(req, res);

		setTimeout(function () {
			res._body.length.should.be.exactly(0);
			done();
		}, 200);
	});

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

		setTimeout(function () {
			groupId = res._body._id;
			res._body.message.should.be.exactly('Received.');
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

	it("should update the group details", function(done) {
		done();
	});

	it("should add a user to the group", function(done) {
		done();
	});

	it("should remove the user from the group", function(done) {
		done();
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

		setTimeout(function () {
			res._body.should.be.an.Object.and.be.empty;
			done();
		}, 200);
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});