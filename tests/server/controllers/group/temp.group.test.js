'use strict';

require('../../../config');
var should = require('should');
var mongoose = require('mongoose');
var TempGroupController = require('../../../../server/controllers/group/temp.group');
var TempGroup = require('../../../../server/models/temp.group');
var Group = require('../../../../server/models/group');

var tempGroup, tempGroup2, req, res;

describe("Temp.Group Controller Unit Tests:", function() {
	before(function(done) {
		tempGroup = new TempGroup({
			interest: 'soccer',
			users:[
			{
				user_id: '54bd693719aee30000967768',
				accepted: false
			},
			{
				user_id: '547b6252ee09fef8405d1834',
				accepted: false
			},
			{
				user_id: '54bfbacd0444730000228786',
				accepted: false
			},
			{
				user_id: '54c77c169d9b51483bb1b167',
				accepted: false
			}]
		});

		tempGroup2 = new TempGroup({
			interest: 'basketball',
			users:[
			{
				user_id: '54bd693719aee30000967768',
				accepted: false
			},
			{
				user_id: '547b6252ee09fef8405d1834',
				accepted: true
			},
			{
				user_id: '54bfbacd0444730000228786',
				accepted: true
			},
			{
				user_id: '54c77c169d9b51483bb1b167',
				accepted: true
			}]
		});

		tempGroup.save();
		tempGroup2.save();
		done();
	});

	describe("findById Unit Tests", function() {
		it("should return tempgroup", function(done) {
			req = {
				params: {
					id: tempGroup._id 
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.findById(req, res);
	
			setTimeout(function() {
				res._body.users.length.should.be.exactly(4);
				res._body.interest.should.be.exactly('soccer');
				done();
			}, 200);
		});

		it("should fail to return tempgroup with invalid", function(done) {
			req = {
				params: {
					id: '5518513ad659c5509ea27482'
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.findById(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('temp group not found');
				done();
			}, 200);
		});
	});

	describe("declineInvite Unit Tests", function() {
		it("should decline invite to tempgroup", function(done) {
			req = {
				params: {
					id: tempGroup._id 
				},
				user: {
					_id: '54bd693719aee30000967768'
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.declineInvite(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('invite declined')
				done();
			}, 200);
		});

		it("should fail to decline invite to tempgroup with invalid _id", function(done) {
			req = {
				params: {
					id: '54bd693719aee30000967768' 
				},
				user: {
					_id: '54bd693719aee30000967768'
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.declineInvite(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('invite could not be declined')
				done();
			}, 200);
		});

		it("should fail to decline invite to tempgroup with invalid user_id", function(done) {
			req = {
				params: {
					id: tempGroup._id 
				},
				user: {
					_id: tempGroup._id
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.declineInvite(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('invite could not be declined')
				done();
			}, 200);
		});
	});

	describe("acceptInvite Unit Tests", function() {
		it("should accept invite to tempgroup", function(done) {
			req = {
				params: {
					id: tempGroup._id 
				},
				user: {
					_id: '54bd693719aee30000967768',
					home_location: {
						type: 'Point',
						coordinates: [-4.442632675170898, 55.89529870636083]
					}
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.acceptInvite(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('invite accepted')
				done();
			}, 200);
		});

		it("should form group, all invites accepted", function(done) {
			req = {
				params: {
					id: tempGroup2._id 
				},
				user: {
					_id: '54bd693719aee30000967768',
					home_location: {
						type: 'Point',
						coordinates: [-4.442632675170898, 55.89529870636083]
					}
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.acceptInvite(req, res);
	
			setTimeout(function() {
				res._body.message.should.be.exactly('group formed')
				done();
			}, 200);
		});

		it("should fail to accept invite with invalid TemoGroup _id", function(done) {
			req = {
				params: {
					id: '54bd693719aee30000967768'
				},
				user: {
					_id: '54bd693719aee30000967768'
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.acceptInvite(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('tempgroup not found')
				done();
			}, 200);
		});

		it("should fail to accept invite with invalid user_id", function(done) {
			req = {
				params: {
					id: tempGroup2._id
				},
				user: {
					_id: tempGroup2._id
				}
			};
			res = {_body: null, render: function() { 'noop'; }};
			res.send = function (body) {res._body = body; };
	
			TempGroupController.acceptInvite(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('tempgroup not found')
				done();
			}, 200);
		});
	});

	after(function(done) {
		TempGroup.remove().exec();
		Group.remove().exec();
		done();
	});
});