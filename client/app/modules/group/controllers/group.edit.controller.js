angular.module('app.group')
.controller('GroupEditController', function($scope, $location, $routeParams, Group, Title) {
	// Might want a call like Settings, so can see if User can access a group
	getGroupDetails();

	function getGroupDetails() {
		$scope.$parent.checkForMessages();
		Group.get({ _id: $routeParams.id }, function(group) {
			Title.set('Editing ' + group.name);
			$scope.group = group;

			$scope.map = {
				center: $scope.group.location.coordinates,
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
						$scope.group.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
					}
				},
				coords: $scope.group.location.coordinates
			};
		});
	}

	$scope.editGroup = function() {
		Group.update($scope.group).$promise.then(function(response) {
			if (response.message == "group has been updated.") {
				alert("updated");
				getGroupDetails();
			}
		});
	};
});