angular.module('app.user')
.controller('UserController', function($scope, $routeParams, User) {
	User.get({ _id: $routeParams.id }, function(user) {
		$scope.user = user;
	});
});