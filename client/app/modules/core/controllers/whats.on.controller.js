(function() {
	'use strict';
	angular
		.module('app.core')
		.controller('WhatsOnController', WhatsOnController);

	function WhatsOnController($scope, Title, $http) {
		$scope.currentLocationEvents = currentLocationEvents;
		$scope.eventMarkerList = [];
		$scope.map;
		$scope.noEvents = true;
		$scope.resetLocation = resetLocation;
		$scope.results;
		var user_location = []; 
		
		Title.set("What's On!");
		getMapDetails();
	
		function getMapDetails(location) {
			$http.get('./api/groups/public/events',{ params: { user_location: location } }).success(function(response) {
				loadMapDetails(response);
				response.message ? $scope.noEvents = true : $scope.noEvents = false; 
			});		
		}
	
		function loadMapDetails(mapData) {
			$scope.results = mapData.results;
			$scope.eventMarkerList = [];
	
			$scope.map = {
				center: mapData.user.coordinates,
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
						$scope.map.center.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
						getMapDetails($scope.map.center.coordinates);
					}
				},
				coords: mapData.user
			};
	
			if (mapData.results) {
				mapData.results.forEach(function(result) {
					$scope.eventMarkerList.push({
						id: result.obj.events[0]._id,
						options: {
							title: result.obj.events[0].name + ' @ ' + result.obj.events[0].date
						},
						coords: result.obj.location.coordinates
					});
				});
			}
		}
	
		function currentLocationEvents() {
			var options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			};
	
			function success(pos) {
				var crd = pos.coords;
				user_location = [crd.longitude, crd.latitude];
				getMapDetails(user_location);
			}
	
			function error(err) {
				console.warn('ERROR(' + err.code + '): ' + err.message);
			}
	
			navigator.geolocation.getCurrentPosition(success);	
		}

		function resetLocation() {
			if (user_location.length !== 0) {
				getMapDetails();
			}
		}
	}
})();