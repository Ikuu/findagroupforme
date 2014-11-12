angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	//$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: '/app/views/home.html'
		})
		.when('/users',{
			templateUrl: '/app/views/users.html',
			controller: 'UsersCtrl'
		})
		.when('/users/:id', {
			templateUrl: '/app/views/user.html',
			controller: 'DetailCtrl'
		})
		.when('/groups', {
			templateUrl: '/app/views/groups.html',
			controller: 'GroupsCtrl'
		})
		.when('/groups/:id', {
			templateUrl: '/app/views/group.html',
			controller: 'GroupCtrl'
		})
		.when('/404',{
			templateUrl: '/app/views/404.html'
		})
		.when('/signup',{
			templateUrl: '/app/views/login.html'
		})
		.when('/about', {
			templateUrl: '/app/views/about.html'
		})
		.otherwise({
			redirectTo: '/404'
		});
	}]);