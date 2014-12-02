angular.module('MyApp')
.controller('HomeCtrl', function($scope, Session){
	$scope.session = Session;
});