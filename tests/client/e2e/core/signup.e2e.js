'use strict';

describe('SignUp.html E2E Tests', function() {
	beforeEach(function() {
		browser.get('index.html#/signup');
	});

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('Sign Up | FindAGroupFor.me');
	});
});