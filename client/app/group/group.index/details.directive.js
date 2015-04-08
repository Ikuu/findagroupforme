(function() {
	'use strict';

	angular
		.module('app.group')
		.directive('detailsPublic', detailsPublic)
		.directive('detailsPrivate', detailsPrivate);

	function detailsPublic() {
		return {
			restrict: 'E',
			templateUrl: '/app/group/group.index/details-public.html'
		};
	}

	function detailsPrivate() {
		return {
			restrict: 'E',
			templateUrl: '/app/group/group.index/details-private.html'
		};
	}
})();