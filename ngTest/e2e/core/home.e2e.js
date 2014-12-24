'use strict';

// spec.js
describe('Home.html E2E Tests', function() {
	beforeEach(function() {
		browser.get('index.html');
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('FindAGroupFor.me');
	});
});