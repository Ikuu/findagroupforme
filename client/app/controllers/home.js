angular.module('MyApp')
.controller('HomeCtrl', ['$scope', 'Session', function($scope, Session){
	$scope.s = Session;
}]);