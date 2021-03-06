'use strict';

describe("Settings.html E2E Tests", function() {
	var username, password, submit;
	beforeEach(function() {
		browser.get('index.html#/login');

		username = element(by.id('username'));
		password = element(by.id('password'));
		submit = element(by.id('submit'));
	});

	it("should re-direct to /login if not logged in", function() {
		username.sendKeys('Ikuu');
		password.sendKeys('123');
		submit.click();

		browser.setLocation('settings');
		expect(browser.getLocationAbsUrl()).toBe('/login');
	});

	it("should successfully load settings page", function() {
		username.sendKeys('Ikuu');
		password.sendKeys('1');
		submit.click();

		browser.setLocation('settings');
		expect(browser.getLocationAbsUrl()).toBe('/settings');
		expect(browser.getTitle()).toEqual('Edit Settings | FindAGroupFor.me');
	});

	afterEach(function() {
		browser.get('/logout');
	});

	// Add tests for form stuff.
});