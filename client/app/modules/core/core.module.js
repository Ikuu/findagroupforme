angular.module('app.core', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/app/modules/core/views/home.html',
			controller: 'HomeController'
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