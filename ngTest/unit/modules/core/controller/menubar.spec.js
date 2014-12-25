'use strict';

describe('Core.MenuBarController', function() {
	var $scope;
	beforeEach(module('app.core'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('MenuBarController', {$scope: $scope});
	}));

	it('$scope.loggedIn should be false', function() {
		expect($scope.loggedIn).toBe(false);
	});
});