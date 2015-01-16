require('../../config');
var should = require('should');
var UserController = require('../../../server/controllers/user/user');

describe('UserController Unit Tests:', function() {
	it('Should return no users', function(done){

		req = {};
		res = {_body: null, render: function() { 'noop'; } };
		res.send = function (body) { res._body = body; };

		UserController.index(req, res);

		setTimeout(function () {
			res._body.length.should.be.exactly(0);
			done();
		}, 200);
	});
});