angular.module('App.core')
.controller('UsersCtrl', function($scope, User) {
	$scope.users = User.query();
});