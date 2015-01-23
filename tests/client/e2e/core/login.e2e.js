'use strict';

describe("Login.html E2E Tests", function() {
	var username, password, submit;
	beforeEach(function() {
		browser.get('index.html#/login');

		username = element(by.id('username'));
		password = element(by.id('password'));
		submit = element(by.id('submit'));
	});

	it("should have a title", function() {
		expect(browser.getTitle()).toEqual('Login | FindAGroupFor.me');
	});

	it("should not login, and redirect to login", function() {
		username.sendKeys('Ikuu');
		password.sendKeys('123');
		submit.click();

		expect(browser.getLocationAbsUrl()).toBe('/login');
	});

	it("should login successfully", function() {
		username.sendKeys('Ikuu');
		password.sendKeys('1');
		submit.click();

		expect(browser.getLocationAbsUrl()).toBe('/');
	});

	afterEach(function() {
		browser.get('/logout');
	});
});