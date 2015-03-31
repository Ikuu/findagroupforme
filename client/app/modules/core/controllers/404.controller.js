angular.module('app.core')
.controller('404Controller', function($scope, Title) {
	$scope.$parent.checkForMessages();
	Title.set('404 Error');
});