angular.module('app.core')
.controller('GroupsController', function($scope, Group) {
	$scope.groups = Group.query();
});