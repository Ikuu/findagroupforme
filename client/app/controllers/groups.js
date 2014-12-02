angular.module('MyApp')
.controller('GroupsCtrl', function($scope, Group, Session, $location) {
	$scope.groups = Group.query();
	$scope.session = Session;
});