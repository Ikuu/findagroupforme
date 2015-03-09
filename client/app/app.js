angular.module('app', [
	'ngRoute', 
	'ngResource', 
	'ngMessages',
	'ngSanitize', 
	'google-maps'.ns(),
	'app.core',
	'app.user',
	'app.group'
])
.config(function($locationProvider, $routeProvider, $httpProvider) {
	$httpProvider.interceptors.push(interceptor);
});

var interceptor = function ($location, $q) {
	return {
		'responseError': function (response) {
			if (response.status === 401) {
				$location.url('/login');
			}
			if (response.status === 403) {
				alert("You do not have permission for this action!");
			}
			return $q.reject(response);
		}
	};
};