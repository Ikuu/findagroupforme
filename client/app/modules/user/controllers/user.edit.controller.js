// Rename to settings. Also need to have some feedback on the changes the user has made.
angular.module('app.user')
.controller('UserEditController', function($scope, $routeParams, User, $location, $route, Title){
	Title.set('Edit Settings');

	User.getSignedInUser({}, function(user) {
		$scope.user = user;
	});

	User.findMatchmakingGroups({}, function(data) {
		$scope.match = data;
	});


	$scope.editUser = function() {
		User.update($scope.user).$promise.then(function(response) {
			if (response.message === "User has been updated") {
				alert("Profile Updated!");
				$route.reload();
			}
		});
	};
});