(function() {
	'use strict';

	angular
		.module('app.whatson')
		.directive('eventMap', eventMap);

	function eventMap() {
		return {
			restrict: 'E',
			templateUrl: '/app/modules/whatson/event-map.html'
		};
	}
})();