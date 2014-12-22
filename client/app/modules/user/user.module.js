angular.module('app.user', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider
		// Profile
		.when('/settings',{
			templateUrl: './app/modules/user/views/user.edit.html',
			controller: 'UserEditController'
		})
		// User Routes
		.when('/users', {
			templateUrl: '/app/modules/core/views/users.html',
			controller: 'UsersController'
		})
		.when('/user/:id', {
			templateUrl: '/app/modules/user/views/user.index.html',
			controller: 'UserController'
		});
});