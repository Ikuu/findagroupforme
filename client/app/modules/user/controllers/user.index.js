angular.module('App.user')
.controller('UserCtrl', function($scope, $routeParams, $location, User) {
	User.get({ _id: $routeParams.id }, function(user){
		$scope.user = user;
	}, function(response){
	});
});