angular.module('app.core')
.controller('MessagesController', function($scope, $routeParams, User, Title){
	Title.set('Messages');

	User.getSignedInUser({}, function(user) {
		$scope.user = user;
	});
});