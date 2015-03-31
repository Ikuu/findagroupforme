angular.module('app.core')
.controller('HomeController', function($scope, Title) {
	$scope.$parent.checkForMessages();
	Title.set('');
});