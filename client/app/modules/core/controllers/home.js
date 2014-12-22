angular.module('app.core')
.controller('HomeController', function($scope, UserFactory){
	UserFactory.getUser().then(function success(response) {
		$scope.user = response.data;
	});
});