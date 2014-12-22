angular.module('app.core')
.controller('HomeController', function($rootScope, $scope, UserFactory){
	UserFactory.getUser().then(function success(response) {
		$scope.user = response.data;
	});
});