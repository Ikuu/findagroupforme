angular.module('app.group')
.controller('GroupController', function($scope, $location, $routeParams, $route, Group, Title) { 
	$scope.private = false;
	$scope.group = Group.get({ _id: $routeParams.id }, function(group) {
		Title.set(group.name);

		if (group.privateGroup) {
			$scope.private = true; 
		}
		else {
			$scope.map = {
				center:{
					latitude: group.venue_location[1],
					longitude: group.venue_location[0]
				},
				zoom: 12
			};
	
			$scope.groupMarker = {
				id: 0,
				options: {
					title: group.name,
					icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
				},
				coords: {
					latitude: group.venue_location[1],
					longitude: group.venue_location[0]
				}
			};

			$scope.markerList = []

			group.members.forEach(function(member) {
				$scope.markerList.push({
					id: member._id,
					options: {
						title: member.name
					},
					coords: {
						latitude: member.home_location[1],
						longitude: member.home_location[0],
					}
				});
			});
		}
	});

	$scope.editButton = function() {
		$location.path("/groups/"+$routeParams.id+"/edit");
	};

	$scope.deleteButton = function() {
		Group.remove({_id: $routeParams.id}).$promise.then(function(response) {
			alert("Group has been deleted!");
			$location.path('/');
		});
	};

	$scope.joinButton = function() {
		Group.addUser({_id: $routeParams.id}).$promise.then(function(response) {
			if (response.error) {
				alert("Already in this group!");
			}
			else {
				alert("You have joined the group!");
				$route.reload();
			}
		});
	};

	$scope.leaveButton = function() {
		Group.removeUser({_id: $routeParams.id}).$promise.then(function(response) {
			if (response.error) {
				alert("Not in group!");
			}
			else {
				alert("You have left the group!");
				$location.path("/");
			}
		});
	};

	$scope.addEventButton = function(event) {
		Group.addEvent({_id: $routeParams.id, events: event});
	};

	$scope.removeEventButton = function(event_id) {
		Group.removeEvent({_id: $routeParams.id, event_id: event_id});
	};
});