'use strict';

describe('404.html E2E Tests', function() {
	beforeEach(function() {
		browser.get('index.html#/404');
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('404 Error | FindAGroupFor.me');
	});
});