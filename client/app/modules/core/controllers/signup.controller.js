// Needs to forward if everything is fine.
angular.module('app.core')
.controller('SignupController', function($scope, Title, User) {
	Title.set('Sign Up');
	// Ficticious FaGfM Office
	var home_location = {
		type: 'Point',
		coordinates: [-4.262475, 55.861754]
	};

	$scope.map = {
		center: home_location.coordinates,
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
				home_location.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
			}
		},
		coords: home_location.coordinates
	};

	$scope.createUser = function() {
		User.save({
			username: $scope.user.username,
			name: $scope.user.name,
			password: $scope.user.password,
			email: $scope.user.email,
			privacy: $scope.user.privacy,
			home_location: home_location
		}).$promise.then(function(response) {
			console.log(response);
			alert("Signed up!");
		});
	};
});