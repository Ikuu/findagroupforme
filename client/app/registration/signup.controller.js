(function() {
	'use strict';
	angular
		.module('app.registration')
		.controller('SignupController', SignupController);

	function SignupController(Title, User, $location) {
		// Ficticious FaGfM Office
		var home_location = {
			type: 'Point',
			coordinates: [-4.262475, 55.861754]
		};

		var vm = this;
		vm.createUser = createUser;
		vm.map = {
			center: home_location.coordinates,
			zoom: 12
		};
		vm.userMarker = {
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
			coords: home_location
		};

		Title.set('Sign Up');

		function createUser() {
			User.save({
				username: vm.user.username,
				name: vm.user.name,
				password: vm.user.password,
				email: vm.user.email,
				privacy: vm.user.privacy,
				home_location: home_location
			}).$promise.then(function(response) {
				if (response.error) {
					console.log(response.error);
					alert("Error Signing Up!");
				}
				else {
					$location.path('/login');
				}
			});
		}
	}
})();