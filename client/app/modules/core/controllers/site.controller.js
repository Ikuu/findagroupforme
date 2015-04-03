(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('SiteController', SiteController);

	function SiteController($scope, UserFactory, Title) {
		$scope.loggedIn = false;
		$scope.Title = Title;

		loadUserDetails();
	
		function loadUserDetails() {
			UserFactory.getUser().then(function success(response) {
				$scope.loggedInUser = response.data;
				if (response.data.username) {
					$scope.loggedIn = true;
					$scope.numberOfMessages = response.data.messages.length;
				}
			});
		}
	}
})();