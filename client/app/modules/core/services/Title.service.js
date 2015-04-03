(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('Title', title);

	function title($rootScope) {
		var siteName = 'FindAGroupFor.me';
		var service = {
			get: get,
			set: set
		};
		return service;

		////////////////

		function get() {
			return $rootScope.title;
		}

		function set(newPageName) {
			$rootScope.title = (newPageName + ' | ' + siteName);
		}
	}
})();