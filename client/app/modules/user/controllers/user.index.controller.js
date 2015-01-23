angular.module('app.user')
.controller('UserController', function($scope, $routeParams, User, Title) {
	$scope.private = false;
	User.get({ _id: $routeParams.id }, function(user) {
		$scope.user = user;
		if (!$scope.user.name) {
			$scope.private = true;
			//Might want something to show if your profile is hidden or not
		}
		Title.set(user.username);
	});
});