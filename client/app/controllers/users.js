angular.module('MyApp')
.controller('UsersCtrl', function($scope, User) {
	$scope.users = User.query();
});