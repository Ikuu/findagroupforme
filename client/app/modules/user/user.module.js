angular.module('App.user', ['ngRoute'])
.config(function($locationProvider, $routeProvider){
	$routeProvider
		// Profile
		.when('/settings',{
			templateUrl: '/app/modules/user/views/user/user.edit.html',
			controller: 'UserEditCtrl'
		})
		// User Routes
		.when('/users', {
			templateUrl: '/app/modules/core/views/users.html',
			controller: 'UsersCtrl'
		})
		.when('/user/:id', {
			templateUrl: '/app/modules/user/views/user.index.html',
			controller: 'UserCtrl'
		});
});