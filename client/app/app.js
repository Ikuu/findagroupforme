angular.module('app', [
	'ngRoute', 
	'ngResource', 
	'ngMessages', 
	'google-maps'.ns(),
	'app.core',
	'app.user',
	'app.group'
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