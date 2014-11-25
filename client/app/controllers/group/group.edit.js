angular.module('MyApp')
.controller('GroupEditCtrl', ['$scope', '$rootScope', '$routeParams', 'Group',
	function($scope, $rootScope, $routeParams, Group) {
		Group.get({ _id: $routeParams.id }, function(group) {
			$scope.group = group;
		});

		$scope.editGroup = function(){
			Group.update({
				_id: $routeParams.id,
				name: $scope.group.name,
				description: $scope.group.description,
				activity: $scope.group.activity,
				venue_location: [$scope.group.venue_location[0], $scope.group.venue_location[1]],
				date_created: $scope.group.date_created,
				members: $scope.group.members
			}).$promise.then(function(response){
			});
		};
	}]);