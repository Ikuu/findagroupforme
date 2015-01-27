angular.module('app.core', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/app/modules/core/views/home.html',
			controller: 'HomeController'
			// Probably want a resolve somewhere in here to prevent $scope 'blinking'
		})
		.when('/404',{
			templateUrl: '/app/modules/core/views/404.html',
			controller: '404Controller'
		})
		.when('/login', {
			templateUrl: '/app/modules/core/views/login.html',
			controller: 'LoginController'
		})
		.when('/about', {
			templateUrl: '/app/modules/core/views/about.html',
			controller: 'AboutController'
		})
		.when('/signup', {
			templateUrl: '/app/modules/core/views/signup.html',
			controller: 'SignupController'
		})
		// To handle Facebook Login
		.when('/_=_', {
			redirectTo: '/'
		})
		.otherwise({
			redirectTo: '/404'
		});
});