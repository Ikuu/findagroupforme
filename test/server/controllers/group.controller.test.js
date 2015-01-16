require('../../config');
var should = require('should');
var GroupController = require('../../../server/controllers/group');

describe('Group Controller Unit Tests:', function() {
	it('Should return no groups', function(done){
		req = {};
		res = {
			_body: null, 
			render: function() {
				'noop';
			}
		};
		res.send = function (body) {
			res._body = body;
		};

		GroupController.index(req, res);

		setTimeout(function () {
			res._body.length.should.be.exactly(1);
			done();
		}, 200);

	});

	it('Should find group NAME with id 54b7f821a7d2a3312089ab8e', function(done) {
		req = {
			params: {
				group_id: '54b7f821a7d2a3312089ab8e'
			}
		};
		res = {
			_body: null, 
			render: function() {
				'noop';
			}
		};
		
		res.send = function (body) {
			res._body = body;
		};

		GroupController.findById(req, res);

		setTimeout(function () {
			res._body.name.should.be.exactly("name");
			done();
		}, 200);
	});
});