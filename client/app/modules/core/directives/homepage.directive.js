angular.module('app.core')
.directive('homepageLoggedIn', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/core/views/homepage/loggedin.html'
	};
})

.directive('homepageLoggedOut', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/core/views/homepage/loggedout.html'
	};
});