(function() {
	'use strict';

	angular
		.module('app.user')
		.directive('profilePublic', profilePublic)
		.directive('profilePrivate', profilePrivate);

	function profilePublic() {
		return {
			restrict: 'E',
			templateUrl: '/app/user/profile-public.html'
		};
	}

	function profilePrivate() {
		return {
			restrict: 'E',
			templateUrl: '/app/user/profile-private.html'
		};
	}
})();