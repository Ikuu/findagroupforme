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
		.when('/messages', {
			templateUrl: '/app/modules/core/views/messages.html',
			controller: 'MessagesController'
		})
		.when('/matchmaking', {
			templateUrl: '/app/modules/core/views/matchmaking.html',
			controller: 'MatchmakingController'
		})
		.when('/match/:id', {
			templateUrl: '/app/modules/core/views/match.index.html',
			controller: 'MatchController',
			controllerAs: 'vm'
		})
		.when('/whatson', {
			templateUrl: '/app/modules/core/views/whats.on.html',
			controller: 'WhatsOnController'
		})
		// To handle Facebook Login
		.when('/_=_', {
			redirectTo: '/'
		})
		.otherwise({
			redirectTo: '/404'
		});
});