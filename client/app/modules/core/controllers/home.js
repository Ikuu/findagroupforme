angular.module('app.core')
.controller('HomeController', function($rootScope, $scope, Session){
	$scope.user = Session;
});