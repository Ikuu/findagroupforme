angular.module('app.core')
.controller('UsersController', function($scope, User, Title) {
	$scope.$parent.checkForMessages();
	Title.set('Users');
	$scope.users = User.query();
});