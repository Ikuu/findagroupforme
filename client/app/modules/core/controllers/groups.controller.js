angular.module('app.core')
.controller('GroupsController', function($scope, Group, Page) {
	Page.setTitle('Groups')
	$scope.groups = Group.query();
});