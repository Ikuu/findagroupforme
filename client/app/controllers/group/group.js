angular.module('MyApp')
.controller('GroupCtrl', function($scope, $location, $routeParams, $route, Group){
	$scope.group = Group.get({ _id: $routeParams.id }, function(group) {
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
		if (response.status === 403){
			$location.path('/login');
		}
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