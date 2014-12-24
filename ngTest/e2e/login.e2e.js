'use strict';

describe("Login.html E2E Tests", function() {
	beforeEach(function() {
		browser.get('/logout');
		browser.get('index.html#/login');
	});

	it("should not login, and redirect to signup", function() {
		// Really this should redirect to login and give error
		var username = element(by.id('username'));
		var password = element(by.id('password'));
		var submit = element(by.id('submit'));

		username.sendKeys('Ikuu');
		password.sendKeys('123');
		submit.click();

		expect(browser.getLocationAbsUrl()).toBe('/signup');
	});

	it("should login successfully", function() {
		var username = element(by.id('username'));
		var password = element(by.id('password'));
		var submit = element(by.id('submit'));

		username.sendKeys('Ikuu');
		password.sendKeys('1');
		submit.click();

		expect(browser.getLocationAbsUrl()).toBe('/');
	});
});