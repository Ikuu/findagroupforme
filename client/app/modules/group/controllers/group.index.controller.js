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
					latitude: group.venue_location[0],
					longitude: group.venue_location[1]
				},
				zoom: 15
			};
	
			$scope.marker = {
				id: 0,
				coords: {
					latitude: group.venue_location[0],
					longitude: group.venue_location[1]
				}
			};
			
			$scope.marker2 = {
				id: 0,
				coords: {
					latitude: group.members[0].current_location[0],
					longitude: group.members[0].current_location[1]
				}
			};
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