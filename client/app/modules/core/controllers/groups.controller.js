angular.module('app.core')
.controller('GroupsController', function($scope, Group, Title) {
	Title.set('Groups');
	$scope.groups = Group.query();
});