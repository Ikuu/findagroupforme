'use strict';

describe("Core.HomeController", function() {
	var $scope, user;

	var returnedUser = {
		_id: "5473777e753bbfdc8b654470",
		email: "revolution6000@gmail.com",
		username: "Ikuu",
		name: "Alexander Anderson",
		__v: 19,
		groups: [
			"547499888a46603c041a6b66"
		],
		current_location: [
			55.896154,
			-4.427094
		],
		home_location: [
			null,
			null
		],
		twitter: {
		photos: [ ]
		},
		activities: [ ],
		date_registered: "2014-11-24T18:22:54.062Z"
	}

	beforeEach(module('app.core'));
	beforeEach(inject(function($rootScope, $controller) {
		user = {
			getUser: function() {

			}
		};

		spyOn(user, 'getUser').and.returnValue(returnedUser);

		$scope = $rootScope.$new();
		$controller('HomeController', {$scope: $scope})
	}));

	// Need to find out how to test this code properly.
	it("$scope.user to be undefined", function() {
		expect($scope.user).toBe(undefined);
	});
});