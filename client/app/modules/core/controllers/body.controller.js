angular.module('app.core')
.controller('BodyController', function($scope, UserFactory, Page) {
	$scope.Page = Page;
	$scope.loggedIn = false;
	
	UserFactory.getUser().then(function success(response) {
		$scope.loggedInUser = response.data;
		if (response.data.username) {
			$scope.loggedIn = true;
		}
	});
});