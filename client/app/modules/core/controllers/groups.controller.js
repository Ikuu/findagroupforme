angular.module('app.core')
.controller('GroupsController', function($scope, Group, Title) {
	$scope.$parent.checkForMessages();
	Title.set('Groups');
	$scope.groups = Group.query();
});