// Currently we're grabbing the username in both the menu and index, should sort this out.
angular.module('app.core')
.controller('MenuController', function($scope, UserFactory) {
	$scope.loggedIn = false;

	UserFactory.getUser().then(function success(response) {
		if (response.data.username) {
			$scope.loggedIn = true;
		}
	});
});