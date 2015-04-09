'use strict';

require('../../../config');
var should = require('should');
var User = require('../../../../server/models/user');
var PublicApiController = require('../../../../server/controllers/user/user.public.api');

var apiUser, apiUser2, req, res, userID, apiKey;

describe('PublicApiController Unit Tests:', function() {
	before(function(done) {
		apiUser = new User({
			username: "Test User #1",
			name: "Test User #1",
			interests: ["football", "basketball", "rugby", "golf"],
			home_location: {
				type: "Point",
				coordinates: [-4.356888757324214, 55.899691421659476]
			}
		});

		apiUser2 = new User({
			username: "Test User #2",
			name: "Test User #2",
			interests: ["football", "basketball", "tennis", "golf"],
			home_location: {
				type: "Point",
				coordinates: [-4.356888757324214, 55.899691421659476]
			}
		});

		apiUser.save();
		apiUser2.save();
		done();
	});

	describe("generatePublicApiKey Unit Tests", function() {
		it("should generate a new public api key", function(done) {
			req = {
				user: {
					_id: apiUser._id
				},
				body: {
					api: {
						project: "Test Application"
					}
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.generatePublicApiKey(req, res);
	
			setTimeout(function() {
				apiKey = res._body.api.key; // create a copy for future tests
				res._body.should.have.property('api');
				res._body.api.project.should.be.exactly('Test Application');
				done();
			}, 200);
		});

		it("should not change api entry if user already has generated key", function(done) {
			req = {
				user: {
					_id: apiUser._id
				},
				body: {
					api: {
						project: "Test Application"
					}
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.generatePublicApiKey(req, res);
	
			setTimeout(function() {
				res._body.should.have.property('api');
				res._body.api.key.should.be.exactly(apiKey);
				res._body.api.project.should.be.exactly('Test Application');
				done();
			}, 200);
		});
	});

	describe("generateNewPublicApiKey Unit Tests", function() {
		it("should generate a new public api key", function(done) {
			req = {
				user: {
					_id: apiUser._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.generateNewPublicApiKey(req, res);
	
			setTimeout(function() {
				res._body.api.key.should.not.equal(apiKey);
				res._body.api.project.should.be.exactly('Test Application');
				done();
			}, 200);
		});

		it("should fail generate a new public api key if user doesn't have key", function(done) {
			req = {
				user: {
					_id: apiUser2._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.generateNewPublicApiKey(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly('no key present');
				done();
			}, 200);
		});
	});

	describe('deletePublicApyKey Unit Tests', function() {
		it("should delete public api key", function(done) {
			req = {
				user: {
					_id: apiUser._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.deletePublicApiKey(req, res);
	
			setTimeout(function() {
				res._body.api.should.be.an.Object;
				done();
			}, 200);
		});

		it("should fail to delete public api key if not present", function(done) {
			req = {
				user: {
					_id: apiUser2._id
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.deletePublicApiKey(req, res);
	
			setTimeout(function() {
				res._body.api.should.be.an.Object;
				done();
			}, 200);
		});

		it("should fail to delete public api key if not present", function(done) {
			req = {
				user: {
					_id: 'apiUser2._id'
				}
			};
			res = {_body: null, render: function() { 'noop'; } };
			res.send = function (body) { res._body = body; };
	
			PublicApiController.deletePublicApiKey(req, res);
	
			setTimeout(function() {
				res._body.error.should.be.exactly("could not find user");
				done();
			}, 200);
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});
});