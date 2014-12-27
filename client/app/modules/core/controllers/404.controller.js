angular.module('app.core')
.controller('404Controller', function($scope, Title) {
	Title.set('404 Error');
});