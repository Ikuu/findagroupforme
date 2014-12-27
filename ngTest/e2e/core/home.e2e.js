/*
	it('should show off bindings', function() {
		expect(element(by.css('div[ng-controller="Controller"] span[ng-bind]')).getText())
		.toBe('Max Karl Ernst Ludwig Planck (April 23, 1858 – October 4, 1947)');
	});
*/

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