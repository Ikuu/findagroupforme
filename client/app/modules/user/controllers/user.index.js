angular.module('app.user')
.controller('UserController', function($scope, $routeParams, $location, User) {
	User.get({ _id: $routeParams.id }, function(user){
		$scope.user = user;
	});
});