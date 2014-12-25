angular.module('app.core')
.directive('menubarLoggedIn', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/core/views/menu/loggedin.html'
	};
})

.directive('menubarLoggedOut', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/core/views/menu/loggedout.html'
	};
});