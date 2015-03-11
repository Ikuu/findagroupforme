// Rename to settings. Also need to have some feedback on the changes the user has made.
angular.module('app.user')
.controller('UserEditController', function($scope, $routeParams, User, $location, $route, Title, Matchmaking) {
	Title.set('Edit Settings');

	User.getSignedInUser({}, function(user) {
		$scope.user = user;
	});

	Matchmaking.findCurrentSearches({}, function(data) {
		$scope.match = data;
	});

	$scope.deleteMatch = function(id) {
		Matchmaking.deleteMatch({ _id: id }).$promise.then(function(response) {
			$route.reload();
		});
	};

	$scope.editUser = function() {
		var address = $scope.user.address.street + " " + $scope.user.address.city;

		geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				$scope.user.home_location.coordinates[0] = results[0].geometry.location.D;
				$scope.user.home_location.coordinates[1] = results[0].geometry.location.k;
				$scope.$apply();

				User.update($scope.user).$promise.then(function(response) {
					if (response.message === "User has been updated") {
						alert("Profile Updated!");
						$route.reload();
					}
				});
			}
		});
	};
});