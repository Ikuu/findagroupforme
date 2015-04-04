angular.module('app.core', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/app/modules/core/views/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})
		.when('/404',{
			templateUrl: '/app/modules/core/views/404.html',
			controller: '404Controller',
			controllerAs: 'vm'
		})
		.when('/about', {
			templateUrl: '/app/modules/core/views/about.html',
			controller: 'AboutController',
			controllerAs: 'vm'
		})
		.when('/messages', {
			templateUrl: '/app/modules/core/views/messages.html',
			controller: 'MessagesController',
			controllerAs: 'vm'
		})
		// To handle Facebook Login
		.when('/_=_', {
			redirectTo: '/'
		})
		.otherwise({
			redirectTo: '/404'
		});
});