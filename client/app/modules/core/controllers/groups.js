angular.module('app.core')
.controller('GroupsController', function($scope, Group, $location) {
	$scope.groups = Group.query();
});