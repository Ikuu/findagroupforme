'use strict';

require('../../../config');
var should = require('should');
var moment = require('moment');
var PublicEventController = require('../../../../server/controllers/group/public.events');
var Group = require('../../../../server/models/group');
var User = require('../../../../server/models/user');

var group, group2, req, res, eventTime, eventTimeFuture, user;

describe('Public Event Controller Unit Tests:', function() {
	before(function(done) {
		eventTime = moment().add(2, 'minutes');
		eventTimeFuture = moment(eventTime).add(2, 'days');

		user = new User({
			username: 'Test User',
			name: 'Alexander',
			home_location: {
				type: 'Point',
				coordinates: [-4.427973, 55.895983]
			}
		});

		group = new Group({
			name: "Test Judo Group",
			location: {
				type: 'Point',
				coordinates: [-4.449443, 55.9039468]
			},
			members: [user._id],
			events: [{
				name: "New Event",
				description: "Test event for testing",
				date: eventTime
			},
			{
				name: "New Event #2",
				description: "Test event for testing",
				date: eventTimeFuture
			}]
		});

		group2 = new Group({
			name: "Test Soccer Group",
			private: true,
			members: [],
			location: {
				type: 'Point',
				coordinates: [-4.449067, 55.85723],
			},
			events: [{
				name: "New Event",
				description: "Test #2 event for testing",
				date: eventTime
			}]
		});

		group.save();
		group2.save();
		done();
	});

	describe("findPublicEvent Unit Tests", function() {
		it("should return no events, user in judo and soccer is private", function(done) {
			req = {
				user: {
					_id: user._id,
					home_location: user.home_location
				},
				query: {
					user_location: undefined
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			PublicEventController.findPublicEvent(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('no events found');
				done();
			}, 200);
		});

		it("should return soccer events as group now public and user not part of group", function(done) {
			group2.private = false;
			group2.save(function(err) {
				req = {
					user: {
						_id: user._id,
						home_location: user.home_location
					},
					query: {
						user_location: undefined
					}
				};
				res = {_body: null, render: function() { 'noop'; }};
				res.send = function (body) {res._body = body; };
		
				PublicEventController.findPublicEvent(req, res);
		
				setTimeout(function() {
					res._body.results[0].obj.events[0].name.should.be.exactly('New Event');
					res._body.results[0].obj.events[0].description.should.be.exactly('Test #2 event for testing');
					done();
				}, 200);
			});
		});

		it("should return no events, user_id missing", function(done) {
			req = {
				user: {
					_id: ''
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			PublicEventController.findPublicEvent(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('missing location');
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