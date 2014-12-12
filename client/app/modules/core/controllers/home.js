angular.module('app.core')
.controller('HomeController', function($rootScope, $scope){
	$scope.user = $rootScope.user;
});