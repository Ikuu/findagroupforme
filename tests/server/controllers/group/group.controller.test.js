'use strict';

require('../../../config');
var should = require('should');
var mongoose = require('mongoose');
var GroupController = require('../../../../server/controllers/group/group');
var User = require('../../../../server/models/user');

var user, user2, groupId, req, res, eventId;

describe('Group Controller Unit Tests:', function() {
	before(function(done) {
		user = new User({
			username: "Ikuu",
			name: "Test User",
			password: '1',
			home_location: {
				type: "Point",
				coordinates: [-4.356888757324214, 55.899691421659476]
			}
		});

		user2 = new User({
			username: "Test User",
			name: "Test User",
			password: '1',
			home_location: {
				type: "Point",
				coordinates: [-4.356888757324214, 55.899691421659476]
			}
		});

		user.save();
		user2.save();
		done();
	});

	describe("index Unit Tests", function() {
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

	describe("add Unit Tests", function() {
		it("should add a group", function(done) {
			req = {
				user: {
					_id: user._id
				},
				body: {
					name: 'Test Group',
					interest: 'football',
					description: 'This is a test group!',
					location: {
						type: 'Point',
						coordinates: [-4.571489, 55.879622]
					},
					private: true
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.add(req, res);
	
			setTimeout(function() {
				groupId = res._body._id;
				res._body.name.should.be.exactly('Test Group');
				res._body.owner.should.be.exactly(user._id);
				res._body.message.should.be.exactly('Received.');
				done();
			}, 200);
		});

		it("should fail to add group that has no valid user creating it", function(done) {
			req = {
				body: {
					name: 'Test Group',
					interest: 'football',
					description: 'This is a test group!',
					location: {
						type: 'Point',
						coordinates: [-4.571489, 55.879622]
					}
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
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.add(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('body is empty.');
				done();
			}, 200);
		});
	});

	describe("findById Unit Tests", function() {
		it("should fail to return group with invalid id", function(done) {
			req = {
				params: {
					group_id: "5427eb4f598100c1fd15ca7c"
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

		it("should return partial group as user not in group", function(done) {
			req = {
				user: {
					_id: user2._id
				},
				params: {
					group_id: groupId
				}
			};
			res = { _body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.findById(req, res);
	
			setTimeout(function () {
				res._body.should.be.an.Object;
				res._body.name.should.be.exactly('Test Group');
				res._body.privateGroup.should.be.exactly(true);
				done();
			}, 200);
		});

		it("should return the group added", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					group_id: groupId
				}
			};
			res = { _body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.findById(req, res);
	
			setTimeout(function () {
				res._body.group.name.should.be.exactly('Test Group');
				done();
			}, 200);
		});
	});

	describe("update Unit Tests", function() {
		it("should fail to update group with no id", function(done) {
			req = {
				body: {
					name: 'Test Group',
					interest: 'football',
					description: 'This is a test groupz!',
					location: {
						type: 'Point',
						coordinates: [-4.571489, 55.879622]
					}
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
					interest: 'football',
					description: 'This is a test groupz!',
					location: {
						type: 'Point',
						coordinates: [-4.571489, 55.879622]
					}
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

	describe("addUserToGroup Unit Tests", function() {
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

	describe("removeUserFromGroup Unit Tests", function() {
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

	describe("addEventToGroup Unit Tests", function() {
		it("should add event to the group", function(done) {
			req = {
				user: {
					_id: user._id
				},
				body: {
					events: {
						name: "New Event",
						description: "Test event for testing",
						date: "02/02/2015 18:00",
						location: [-4.571489, 55.879622],
					}
				},
				params: {
					group_id: groupId
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.addEventToGroup(req, res);
	
			setTimeout(function() {
				res._body.events[0].name.should.be.exactly("New Event");
				eventId = res._body.events[0]._id;
				done();
			}, 200);
		});

		it("should fail to add event to group that does not exist", function(done) {
			req = {
				user: {
					_id: user._id
				},
				body: {
					events: {
						name: "New Event",
						description: "Test event for testing",
						date: "02/02/2015 18:00",
						location: [-4.571489, 55.879622],
					}
				},
				params: {
					group_id: "54bf8b8666a4350000a8378c"
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.addEventToGroup(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly("could not add event");
				done();
			}, 200);
		});

		it("should fail if event is missing", function(done) {
			req = {
				user: {
					_id: user._id
				},
				body: {
				},
				params: {
					group_id: "54bf8b8666a4350000a8378c"
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.addEventToGroup(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly("could not add event");
				done();
			}, 200);
		});
	});

	describe("removeEventFromGroup Unit Tests", function() {
		it("should remove event from the group", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					group_id: groupId,
					event_id: eventId
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.removeEventFromGroup(req, res);
	
			setTimeout(function() {
				res._body.events.should.be.empty;
				done();
			}, 200);
		});

		it("should fail to remove event that is not in group", function(done) {
			req = {
				user: {
					_id: user._id
				},
				params: {
					group_id: groupId,
					event_id: "54bf8b8666a4350000a8378c"
				}
			};
	
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) { res._body = body; };
	
			GroupController.removeEventFromGroup(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly("could not remove event");
				done();
			}, 200);
		});
	});

	describe("delete Unit Tests", function() {
		it("should fail to delete group with invalid id", function(done) {
			req = {
				params: {
					group_id: "666a4350000a8378c54bf8b8"
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