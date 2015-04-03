// FIX ME - Co-Ordinates
angular.module('app.group')
.controller('GroupCreateController', function(Title, $scope, $location, Group) {
	Title.set('Create Group');
	// Ficticious FaGfM Office
	var group_location = {
		type: 'Point',
		coordinates: [-4.262475, 55.861754]
	};

	$scope.map = {
		center: group_location.coordinates,
		zoom: 12
	};

	$scope.groupMarker = {
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
				group_location.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
			}
		},
		coords: group_location.coordinates
	};

	$scope.createGroup = function() {
		Group.save({
			name: $scope.name,
			interest: $scope.interest,
			private: $scope.private,
			description: $scope.description,
			location: group_location
		}).$promise.then(function(response) {
			alert("Group has been added!");
			$location.path('/groups/' + response._id);
		});
	};
});