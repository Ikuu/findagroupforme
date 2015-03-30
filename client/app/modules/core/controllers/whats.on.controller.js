angular.module('app.core')
.controller('WhatsOnController', function($scope, Title, $http) {
	Title.set("What's On!");
	$scope.results;

	$http.get('./api/groups/public/events').success(function(response) {
		$scope.results = response.results;

		// Need to filter events here - use Moment.js

		$scope.map = {
			center:{
				latitude: response.user.coordinates[1],
				longitude: response.user.coordinates[0]
			},
			zoom: 12
		};

		$scope.userMarker = {
			id: 0,
			options: {
				title: "You!"
			},
			coords: {
				latitude: response.user.coordinates[1],
				longitude: response.user.coordinates[0]
			}
		};

		$scope.eventMarkerList = {
			id: response.results[0].obj.events[0]._id,
			options: {
				title: response.results[0].obj.events[0].name + response.results[0].obj.events[0].date
			},
			coords: {
				latitude: response.results[0].obj.location.coordinates[1],
				longitude: response.results[0].obj.location.coordinates[0],
			}
		};
	});
});