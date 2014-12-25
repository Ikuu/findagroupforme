angular.module('app.core')
.controller('BodyController', function($scope, UserFactory) {
	$scope.loggedIn = false;
	
	UserFactory.getUser().then(function success(response) {
		$scope.loggedInUser = response.data;
		if (response.data.username) {
			$scope.loggedIn = true;
		}
	});
});