angular.module('App.core')
.controller('HomeCtrl', function($scope, Session){
	$scope.session = Session;
});