// Rename to settings.
angular.module('app.user')
.controller('UserEditController', function($scope, $routeParams, User, $location){
	User.getSignedInUser({}, function(user){
		$scope.user = user;
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