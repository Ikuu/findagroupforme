angular.module('app.core')
.controller('GroupsController', function($scope, Group, Session, $location) {
	$scope.groups = Group.query();
	$scope.session = Session;
});