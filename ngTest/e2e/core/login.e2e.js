'use strict';

describe("Login.html E2E Tests", function() {
	var username, password, submit;
	beforeEach(function() {
		browser.get('/logout');
		browser.get('index.html#/login');

		username = element(by.id('username'));
		password = element(by.id('password'));
		submit = element(by.id('submit'));
	});

	it("should not login, and redirect to signup", function() {
		// Really this should redirect to login and give error
		username.sendKeys('Ikuu');
		password.sendKeys('123');
		submit.click();

		expect(browser.getLocationAbsUrl()).toBe('/signup');
	});

	it("should login successfully", function() {
		username.sendKeys('Ikuu');
		password.sendKeys('1');
		submit.click();

		expect(browser.getLocationAbsUrl()).toBe('/');
	});
});