angular.module('app.core')
.directive('menubarLoggedIn', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/core/views/menubar/loggedin.html'
	};
})

.directive('menubarLoggedOut', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/core/views/menubar/loggedout.html'
	};
});