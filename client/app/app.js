(function() {
	'use strict';

	angular
		.module('app', [
			'ngRoute', 
			'ngResource', 
			'ngMessages',
			'ngSanitize', 
			'google-maps'.ns(),

			// Modules
			'app.core',
			'app.user',
			'app.group',
			'app.matchmaking',
			'app.whatson',
			'app.registration',
			'app.settings'
		])
		.config(config)
		.run(run);
	
	function config($httpProvider) {
		$httpProvider.interceptors.push(interceptor);
	}
	
	function run($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
			$rootScope.$broadcast('checkForMessage');
		});
	}
	
	function interceptor($location, $q) {
		return {
			'responseError': function(response) {
				if (response.status === 401) {
					$location.url('/login');
				}
				if (response.status === 403) {
					alert("You do not have permission for this action!");
				}
				return $q.reject(response);
			}
		};
	}
})();