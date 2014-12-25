'use strict';

describe('Core.MenuBarController', function() {
	var $scope;
	beforeEach(module('app.core'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('MenuBarController', {$scope: $scope});
	}));

	it('should exist', function() {
		expect(true).toBe(true);
	});
});