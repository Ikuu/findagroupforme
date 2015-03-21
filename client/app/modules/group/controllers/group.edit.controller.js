angular.module('app.group')
.controller('GroupEditController', function($scope, $location, $routeParams, Group) {
	// Might want a call like Settings, so can see if User can access a group
	Group.get({ _id: $routeParams.id }, function(group) {
		$scope.group = group;
	}, function(response){});

	$scope.editGroup = function(){
		Group.update($scope.group).$promise.then(function(response) {
			if (response.message == "group has been updated.") {
				alert("updated");
				Group.get({ _id: $routeParams.id }, function(group) {
					$scope.group = group;
				});
			}
		});
	};
});