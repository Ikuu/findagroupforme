angular.module('app.core')
.controller('HomeController', function($rootScope, $scope, Session){
	$scope.session = Session;
	$scope.user = $rootScope.user;
});