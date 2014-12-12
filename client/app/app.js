angular.module('App', [
	'ngRoute', 
	'ngCookies', 
	'ngResource', 
	'ngMessages', 
	'google-maps'.ns(),
	'App.core',
	'App.user',
	'App.group'
]).config(function($locationProvider, $routeProvider, $httpProvider){
	$httpProvider.interceptors.push(interceptor);
});

// Might want to move this to a service.
var interceptor = function($location, $q){
	return {
		'responseError': function(response){
			if (response.status === 401){
				$location.url('/login');
			}
			return $q.reject(response);
		}
	};
};