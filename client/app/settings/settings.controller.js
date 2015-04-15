(function() {
	// Rename to settings. Also need to have some feedback on the changes the user has made.
angular.module('app.settings')
.controller('SettingsController', function($scope, $routeParams, User, $location, Title, Matchmaking, $http) {
	Title.set('Edit Settings');
	$scope.addressNotVerified =  true;
	getUserDetails();

	function getUserDetails(){
		User.getSignedInUser({}, function(user) {
			$scope.user = user;

			$scope.map = {
				center: $scope.user.home_location.coordinates,
				zoom: 12
			};

			$scope.userMarker = {
				id: 0,
				options: {
					title: "You!",
					icon: {
						url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
					},
					draggable: true
				},
				events: {
					dragend: function(marker, eventName, args) {
						$scope.user.home_location.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
					}
				},
				coords: $scope.user.home_location.coordinates
			};
		});	
	}

	Matchmaking.findCurrentSearches({}, function(data) {
		$scope.match = data;
	});

	$http.get('/api/users/interest/find').success(function(response) {
		$scope.recommenededInterests = response;
	});

	$scope.addRecommendedInterest = function(interest) {
		User.addInterest({ interest: interest }).$promise.then(function(response) {
			getUserDetails();
			$http.get('/api/users/interest/find').success(function(response) {
				$scope.recommenededInterests = response;
			});
		});
	};

	$scope.changePassword = function() {
		User.changePassword({
			currentPassword: $scope.currentPassword,
			newPassword: $scope.newPassword
		}).$promise.then(function(response) {
			if (response.error) {
				alert(response.error);
			}
			else {
				$scope.currentPassword = '';
				$scope.newPassword = '';
			}
		});
	};

	$scope.deleteMatch = function(id) {
		Matchmaking.deleteMatch({ _id: id }).$promise.then(function(response) {
			Matchmaking.findCurrentSearches({}, function(data) {
				$scope.match = data;
			});
		});
	};

	$scope.editUser = function() {
		User.update({
			_id: $scope.user._id,
			name: $scope.user.name,
			email: $scope.user.email,
			private: $scope.user.private,
			home_location: $scope.user.home_location
		}).$promise.then(function(response) {
			if (response.message === "User has been updated") {
				alert("Profile Updated!");
				getUserDetails();
			}
		});
	};

	$scope.addInterest = function() {
		var interest = prompt("Please enter the interest:");
		if (interest !== null) {
			User.addInterest({ interest: interest }).$promise.then(function(response) {
				getUserDetails();

				$http.get('/api/users/interest/find').success(function(response) {
					$scope.recommenededInterests = response;
				});
			});
		}
	};
	
	$scope.removeInterest = function(interest) {
		User.removeInterest({ interest: interest }).$promise.then(function(response) {
			getUserDetails();

			$http.get('/api/users/interest/find').success(function(response) {
				$scope.recommenededInterests = response;
			});
		});
	};
});
})();