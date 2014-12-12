angular.module('app.core')
.controller('UsersController', function($scope, User) {
	$scope.users = User.query();
});