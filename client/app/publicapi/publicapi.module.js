(function() {
	'use strict';

	angular
		.module('app.publicApi', [
		])
		.config(config);

	function config($routeProvider) {
		$routeProvider
		.when('/publicapi', {
			templateUrl: '/app/publicapi/publicapi.html',
			controller: 'PublicApiController',
			controllerAs: 'vm'
		});
	}
})();