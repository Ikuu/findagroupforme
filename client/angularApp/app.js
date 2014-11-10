angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	//$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: '/angularApp/views/home.html'
			//controller: 'MainCtrl'
		})
		.when('/users',{
			templateUrl: '/angularApp/views/users.html',
			controller: 'UsersCtrl'
		})
		.when('/users/:id', {
			templateUrl: '/angularApp/views/user.html',
			controller: 'DetailCtrl'
		})
		.when('/groups', {
			templateUrl: '/angularApp/views/groups.html',
			controller: 'GroupsCtrl'
		})
		.when('/groups/:id', {
			templateUrl: '/angularApp/views/group.html',
			controller: 'GroupCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);