angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'google-maps'.ns()])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	//$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: '/app/views/home.html',
			controller: 'HomeCtrl'
		})
		.when('/404',{
			templateUrl: '/app/views/404.html'
		})
		.when('/login', {
			templateUrl: '/app/views/login.html'
		})
		.when('/about', {
			templateUrl: '/app/views/about.html'
		})
		.when('/signup', {
			templateUrl: '/app/views/signup.html'
		})
		// Profile
		.when('/settings',{
			templateUrl: '/app/views/user/user.edit.html',
			controller: 'UserEditCtrl'
		})
		// Group Routes
		.when('/groups', {
			templateUrl: '/app/views/groups.html',
			controller: 'GroupsCtrl'
		})
		.when('/groups/:id', {
			templateUrl: '/app/views/group/group.html',
			controller: 'GroupCtrl'
		})
		.when('/groups/:id/edit', {
			templateUrl: '/app/views/group/group.edit.html',
			controller: 'GroupEditCtrl'
		})
		.when('/group/create', {
			templateUrl: '/app/views/group/group.create.html',
			controller: 'GroupCreateCtrl'
		})
		// User Routes
		.when('/users', {
			templateUrl: '/app/views/users.html',
			controller: 'UsersCtrl'
		})
		.when('/user/:id', {
			templateUrl: '/app/views/user/user.html',
			controller: 'UserCtrl'
		})
		.otherwise({
			redirectTo: '/404'
		});
	}]);