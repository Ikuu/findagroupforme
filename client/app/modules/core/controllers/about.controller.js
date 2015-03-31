angular.module('app.core')
.controller('AboutController', function($scope, Title) {
	$scope.$parent.checkForMessages();
	Title.set('About');
});