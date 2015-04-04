(function() {
	'use strict';

	angular
		.module('app.matchmaking', [
			'ngRoute'
		])
		.config(config);

	function config($routeProvider) {
		$routeProvider
		.when('/matchmaking', {
			templateUrl: '/app/matchmaking/matchmaking.html',
			controller: 'MatchmakingController',
			controllerAs: 'vm'
		})
		.when('/match/:id', {
			templateUrl: '/app/matchmaking/group.match.html',
			controller: 'GroupMatchController',
			controllerAs: 'vm'
		});
	}
})();