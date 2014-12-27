angular.module('app.group')
.controller('GroupController', function($scope, $location, $routeParams, $route, Group, Page){
	$scope.group = Group.get({ _id: $routeParams.id }, function(group) {
		Page.setTitle(group.name);

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

	}, function(response){
	});

	$scope.editButton = function(){
		$location.path("/groups/"+$routeParams.id+"/edit");
	};

	$scope.deleteButton = function(){
		Group.remove({_id: $routeParams.id}).$promise.then(function(response){
			alert("Group has been deleted!");
			$location.path('/');
		});
	};

	$scope.joinButton = function(){
		Group.addUser({_id: $routeParams.id}).$promise.then(function(response){
			alert("You have joined the group!");
			$route.reload();
		});
	};

	$scope.leaveButton = function(){
		Group.removeUser({_id: $routeParams.id}).$promise.then(function(response){
			alert("You have left the group!");
			$location.path("/");
		});
	};
});