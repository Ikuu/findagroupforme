'use strict';

describe('About.html E2E Tests', function() {
	beforeEach(function() {
		browser.get('index.html#/about');
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('About | FindAGroupFor.me');
	});
});