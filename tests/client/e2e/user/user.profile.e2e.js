'use strict';

describe("User.Profile.html E2E Tests", function() {
	var username, password, submit, userUsername, userGroup, userPrivateText;

	beforeEach(function() {
		browser.get('index.html#/login');

		username = element(by.id('username'));
		password = element(by.id('password'));
		submit = element(by.id('submit'));
		userUsername = element.all(by.css('h2')).get(0);
		userGroup = element.all(by.css('h2')).get(1);
		userPrivateText = element.all(by.css('p')).get(0);
	});

	it("should display user profile and be public", function() {
		username.sendKeys('Ikuu');
		password.sendKeys('1');
		submit.click();

		// find out how to get this id without manually putting it in
		//browser.setLocation('user/54bd693719aee30000967768');
		browser.setLocation('user/54738add5014e6000091a93f');

		expect(browser.getTitle()).toEqual('Ikuu | FindAGroupFor.me');
		expect(userUsername.getText()).toEqual('Ikuu');
		expect(userGroup.getText()).toEqual('Groups');
	});

	it("should display user profile and be private", function() {
		//username.sendKeys('Ikuu00');
		username.sendKeys('1kuu');
		password.sendKeys('1');
		submit.click();

		//browser.setLocation('user/54bd693719aee30000967768');
		browser.setLocation('user/54738add5014e6000091a93f');

		expect(browser.getTitle()).toEqual('Ikuu | FindAGroupFor.me');
		expect(userUsername.getText()).toEqual('Ikuu');
		expect(userPrivateText.getText()).toEqual('User has chosen to hide their profile.');
	});

	afterEach(function() {
		browser.get('/logout');
	});
});