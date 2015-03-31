angular.module('app.core')
.controller('WhatsOnController', function($scope, Title, $http) {
	Title.set("What's On!");
	var user_location;
	// write function to grab data that allows passing a variable, find geolocation and pass
	// write support for no location.

	$http.get('./api/groups/public/events', { params: { user_location: user_location } }).success(function(response) {
		$scope.results = response.results;
		$scope.eventMarkerList = [];

		$scope.map = {
			center: response.user.coordinates,
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
					console.log(marker.getPosition());
				}
			},
			coords: response.user
		};

		response.results.forEach(function(result) {
			$scope.eventMarkerList.push({
				id: result.obj.events[0]._id,
				options: {
					title: result.obj.events[0].name + ' @ ' + result.obj.events[0].date
				},
				coords: result.obj.location.coordinates
			});
		});
	});	
});