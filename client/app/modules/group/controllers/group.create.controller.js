// FIX ME - Co-Ordinates
angular.module('app.group')
.controller('GroupCreateController', function($scope, $location, Group) {
		$scope.createGroup = function(){
			Group.save({
				name: $scope.name,
				interest: $scope.interest,
				description: $scope.description,
				location: {
					type: 'Point',
					coordinates: [-1, 1]
				}
			}).$promise.then(function(response){
				alert("Group has been added!");
				$location.path('/groups/' + response._id);
			});
		};
	});