angular.module('app.group')
.controller('GroupCreateController', function($scope, $rootScope, $location, Group) {
		$scope.createGroup = function(){
			Group.save({
				name: $scope.name,
				activity: $scope.activity,
				description: $scope.description,
				venue_location: [$scope.locationLat, $scope.locationLong]
			}).$promise.then(function(response){
				alert("Group has been added!");
				$location.path('/groups/' + response._id);
			});
		};
	});