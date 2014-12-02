angular.module('App.group', ['ngRoute'])
.config(function($locationProvider, $routeProvider){
	$routeProvider
		.when('/groups', {
			templateUrl: '/app/modules/core/views/groups.html',
			controller: 'GroupsCtrl'
		})
		.when('/groups/:id', {
			templateUrl: '/app/modules/group/views/group.index.html',
			controller: 'GroupCtrl'
		})
		.when('/groups/:id/edit', {
			templateUrl: '/app/modules/group/views/group.edit.html',
			controller: 'GroupEditCtrl'
		})
		.when('/group/create', {
			templateUrl: '/app/modules/group/views/group.create.html',
			controller: 'GroupCreateCtrl'
		});
});