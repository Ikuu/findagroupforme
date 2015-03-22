angular.module('app.group')
.controller('GroupCreateController', function($scope, $location, Group) {
		$scope.createGroup = function(){
			Group.save({
				name: $scope.name,
				interest: $scope.interest,
				description: $scope.description,
				venue_location: [$scope.locationLat, $scope.locationLong]
			}).$promise.then(function(response){
				alert("Group has been added!");
				$location.path('/groups/' + response._id);
			});
		};
	});