angular.module('app', [
	'ngRoute', 
	'ngResource', 
	'ngMessages', 
	'google-maps'.ns(),
	'app.core',
	'app.user',
	'app.group'
])
.factory('Page', function() {
	var siteName = 'FindAGroupFor.me';
	var pageName = '';
	return {
		getTitle: function() {
			if (pageName === '') return siteName;
			return pageName + ' | ' + siteName;
		},
		setTitle: function(newPageName) {
			pageName = newPageName;
		}
	}
})
.config(function($locationProvider, $routeProvider, $httpProvider) {
	$httpProvider.interceptors.push(interceptor);
});

// Might want to move this to a service.
var interceptor = function($location, $q) {
	return {
		'responseError': function(response) {
			if (response.status === 401){
				$location.url('/login');
			}
			return $q.reject(response);
		}
	};
};