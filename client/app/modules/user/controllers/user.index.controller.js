angular.module('app.user')
.controller('UserController', function($scope, $routeParams, User, Page) {
	User.get({ _id: $routeParams.id }, function(user) {
		$scope.user = user;
		Page.setTitle(user.name);
	});
});