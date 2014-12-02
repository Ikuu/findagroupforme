angular.module('App.core', ['ngRoute'])
.config(function($locationProvider, $routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/app/modules/core/views/home.html',
			controller: 'HomeCtrl'
		})
		.when('/404',{
			templateUrl: '/app/modules/core/views/404.html'
		})
		.when('/login', {
			templateUrl: '/app/modules/core/views/login.html'
		})
		.when('/about', {
			templateUrl: '/app/modules/core/views/about.html'
		})
		.when('/signup', {
			templateUrl: '/app/modules/core/views/signup.html'
		})
		.otherwise({
			redirectTo: '/404'
		});
});