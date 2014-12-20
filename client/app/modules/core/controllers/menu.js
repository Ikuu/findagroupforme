angular.module('app.core')
.controller('MenuController', function($rootScope, $scope, $http) {
	$scope.loggedIn = false;

	$http.get('/session').success(function(data){
		if (data.username) {
			$scope.loggedIn = true;
		}
	});
});