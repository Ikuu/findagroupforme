// Rename to settings. Also need to have some feedback on the changes the user has made.
angular.module('app.user')
.controller('UserEditController', function($scope, $routeParams, User, $location, $route, Title){
	Title.set('Edit Settings');
	User.getSignedInUser({}, function(user){
		$scope.user = user;
	});

	// Can just change this to pass $scope.user
	$scope.editUser = function() {
		User.update($scope.user).$promise.then(function(response) {
			console.log(response);
			if (response.message === "User has been updated") {
				alert("Profile Updated!");
				$route.reload();
			}
		});
	};
});