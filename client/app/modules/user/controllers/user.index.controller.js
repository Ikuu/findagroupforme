angular.module('app.user')
.controller('UserController', function($scope, $routeParams, User, Title) {
	User.get({ _id: $routeParams.id }, function(user) {
		$scope.user = user;
		Title.set(user.name);
	});
});