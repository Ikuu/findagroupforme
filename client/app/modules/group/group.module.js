angular.module('app.group', ['ngRoute'])
.config(function($locationProvider, $routeProvider){
	$routeProvider
		.when('/groups', {
			templateUrl: '/app/modules/core/views/groups.html',
			controller: 'GroupsController',
			resolve: {
				log: checkLog
			}
		})
		.when('/groups/:id', {
			templateUrl: '/app/modules/group/views/group.index.html',
			controller: 'GroupController'
		})
		.when('/groups/:id/edit', {
			templateUrl: '/app/modules/group/views/group.edit.html',
			controller: 'GroupEditController'
		})
		.when('/group/create', {
			templateUrl: '/app/modules/group/views/group.create.html',
			controller: 'GroupCreateController'
		});
});

// Test function, checks to see if user logged in, if not kicks them out.
var checkLog = function($http, $rootScope, $location){
	$http.get('/session')
		.success(function(data){
			$rootScope.user = data;
		})
		.error(function(data){
			$location.path('/login');
		});
};