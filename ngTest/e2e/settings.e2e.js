'use strict';

describe("Settings.html E2E Tests", function() {
	beforeEach(function() {
		browser.get('/logout');
		browser.get('index.html#/login');
	});

	it("should re-direct to /login if not logged in", function() {
		var username = element(by.id('username'));
		var password = element(by.id('password'));
		var submit = element(by.id('submit'));

		username.sendKeys('Ikuu');
		password.sendKeys('123');
		submit.click();

		browser.setLocation('settings');
		expect(browser.getLocationAbsUrl()).toBe('/login');
	});

	it("should successfully load settings page", function() {
		var username = element(by.id('username'));
		var password = element(by.id('password'));
		var submit = element(by.id('submit'));

		username.sendKeys('Ikuu');
		password.sendKeys('1');
		submit.click();

		browser.setLocation('settings');
		expect(browser.getLocationAbsUrl()).toBe('/settings');
	});

	// Add tests for form stuff.
});