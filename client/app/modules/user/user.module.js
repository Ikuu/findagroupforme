angular.module('app.user', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider
		// User Routes
		.when('/users', {
			templateUrl: '/app/modules/core/views/users.html',
			controller: 'UsersController',
			controllerAs: 'vm'
		})
		.when('/user/:id', {
			templateUrl: '/app/modules/user/views/user.index.html',
			controller: 'UserController',
			controllerAs: 'vm'
		});
});