'use strict';

describe("Core.HomeController", function() {
	var $scope;

	beforeEach(module('app.core'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('HomeController', {$scope: $scope})
	}));

	// Need to find out how to test this code properly.
	it("should exist", function() {
		expect(true).toBe(true);
	});
});