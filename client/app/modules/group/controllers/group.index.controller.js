angular.module('app.group')
.controller('GroupController', function($scope, $location, $routeParams, Group, Title) { 
	$scope.private = false;
	loadGroupDetails();

	function loadGroupDetails() {
		$scope.group = Group.get({ _id: $routeParams.id }, function(group) {
			Title.set(group.name);

			if (group.privateGroup) {
				$scope.private = true; 
			}
			else {
				$scope.map = {
					center:{
						latitude: group.location.coordinates[1],
						longitude: group.location.coordinates[0]
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
						latitude: group.location.coordinates[1],
						longitude: group.location.coordinates[0]
					}
				};
	
				$scope.markerList = [];
	
				group.members.forEach(function(member) {
					$scope.markerList.push({
						id: member._id,
						options: {
							title: member.name
						},
						coords: {
							latitude: member.home_location.coordinates[1],
							longitude: member.home_location.coordinates[0],
						}
					});
				});
			}
		});
	}

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
				loadGroupDetails();
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
		Group.addEvent({_id: $routeParams.id, events: event}).$promise.then(function(response) {
			loadGroupDetails();
		});
	};

	$scope.removeEventButton = function(event_id) {
		Group.removeEvent({_id: $routeParams.id, event_id: event_id}).$promise.then(function(response) {
			loadGroupDetails();
		});
	};
});