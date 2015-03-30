// This controller is used to setup and control site wide data.
angular.module('app.core')
.controller('SiteController', function($scope, UserFactory, Title) {
	$scope.Title = Title;
	$scope.loggedIn = false;
	loadUserDetails();

	// Might want to change this, checks for a new message every 20 seconds.
	setInterval(loadUserDetails, 20000);

	function loadUserDetails() {
		UserFactory.getUser().then(function success(response) {
			$scope.loggedInUser = response.data;
			if (response.data.username) {
				$scope.loggedIn = true;
				$scope.numberOfMessages = response.data.messages.length;
			}
		});
	}
});