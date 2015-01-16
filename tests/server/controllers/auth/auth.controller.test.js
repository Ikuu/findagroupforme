/*require('../../../config');
var should = require('should');
var AuthController = require('../../../../server/controllers/auth/auth');

describe("Auth Controller Unit Tests:", function() {
	it("should return Error 401", function(done) {
		req = {
			session:{
				passport: {
				}
			}
		};
		res = {_status: null, _body: null, render: function() { 'noop'; } };
		res.send = function (body) { res._body = body; };
		next = function() {};

		AuthController.checkIfLoggedIn(req, res, next);

		setTimeout(function () {
			console.log(res);
			//res._body.length.should.be.exactly(1);
			done();
		}, 200);
	});
});*/