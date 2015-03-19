// Rename to settings. Also need to have some feedback on the changes the user has made.
angular.module('app.user')
.controller('UserEditController', function($scope, $routeParams, User, $location, $route, Title, Matchmaking) {
	Title.set('Edit Settings');
	$scope.addressNotVerified =  true;
	getUserDetails();

	function getUserDetails(){
		User.getSignedInUser({}, function(user) {
			$scope.user = user;
		});	
	};

	Matchmaking.findCurrentSearches({}, function(data) {
		$scope.match = data;
	});

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
			password: $scope.user.password,
			email: $scope.user.email,
			private: $scope.user.private
		}).$promise.then(function(response) {
			if (response.message === "User has been updated") {
				alert("Profile Updated!");

				getUserDetails();
			}
		});
	};

	$scope.verifyAddress = function() {
		var address = $scope.user.address.street + " " + $scope.user.address.city + " " + $scope.user.address.post_code + " " + $scope.user.address.country;
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				$scope.userCoords = [];
				$scope.userCoords[0] = results[0].geometry.location.D;
				$scope.userCoords[1] = results[0].geometry.location.k;
				$scope.addressNotVerified = false;

				$scope.$apply();
			}
			else {
				$scope.addressNotVerified = true;
				console.log("error, display somehow");
			}
		});
	};

	$scope.saveAddress = function() {
		User.updateAddress({
			_id: $scope.user._id,
			address: $scope.user.address,
			home_location: $scope.userCoords
		}).$promise.then(function(response) {
			if (response.message === "address has been updated") {
				alert("Address Updated!");
				$route.reload();
				//need to close modal here too.
			}
		});
	};

	$scope.addInterest = function() {
		var interest = prompt("Please enter the interest:");
		if (interest !== null) {
			User.addInterest({ interest: interest }).$promise.then(function(response) {
				getUserDetails();
			});
		}
	};
	
	$scope.removeInterest = function(interest) {
		User.removeInterest({ interest: interest }).$promise.then(function(response) {
			getUserDetails();
		});
	};
});