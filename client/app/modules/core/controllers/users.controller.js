angular.module('app.core')
.controller('UsersController', function($scope, User, Title) {
	Title.set('Users');
	$scope.users = User.query();
});