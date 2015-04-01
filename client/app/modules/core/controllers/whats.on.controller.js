// Might want to show map even if no results, just so they know it's working.
angular.module('app.core')
.controller('WhatsOnController', function($scope, Title, $http) {
	$scope.$parent.checkForMessages();
	$scope.noEvents = true;
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

	$scope.currentLocationEvents = function() {
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
	};

	$scope.resetLocation = function() {
		if (user_location.length !== 0) {
			getMapDetails();
		}
	};
});