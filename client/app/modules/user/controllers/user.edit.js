// Rename to settings.
angular.module('App.user')
.controller('UserEditCtrl', function($scope, $routeParams, User, $location){
	User.getSignedInUser({}, function(user){
		$scope.user = user;
	}, function(response){
		if (response.status === 403) {
			alert("Not signed in");
			$location.path('/login');
		}
	});

	$scope.editUser = function(){
		User.update({
			_id: $scope.user._id,
			name: $scope.user.name,
			email: $scope.user.email,
			home_location: [$scope.user.home_location[0], $scope.user.home_location[0]],
			current_location: [$scope.user.current_location[0], $scope.user.current_location[1]]
		}).$promise.then(function(response){
			console.log(response.error);
		});
	};
});