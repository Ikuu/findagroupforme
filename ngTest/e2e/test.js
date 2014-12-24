'use strict';

// spec.js
describe('angularjs homepage', function() {
	browser.get('index.html');

	it('should have a title', function() {
		expect(browser.getTitle()).toEqual('FindAGroupFor.me');
	});

	describe("Name of the group", function() {
		beforeEach(function() {
			browser.get('index.html#/groups')
		});

		it("should behave...", function() {
			var groupTitle = element(by.id('title'));
			expect(groupTitle.getText()).toBe("Group");
		});

	});

});