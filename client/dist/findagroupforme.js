/*! findagroupforme - v0.0.0 - 2014-11-16 */angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'google-maps'.ns()])
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
		.when('/signup',{
			templateUrl: '/app/views/login.html'
		})
		.when('/about', {
			templateUrl: '/app/views/about.html'
		})
		// User Routes
		.when('/users',{
			templateUrl: '/app/views/users.html',
			controller: 'UsersCtrl'
		})
		.when('/users/:id', {
			templateUrl: '/app/views/user/user.html',
			controller: 'UserCtrl'
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
		.otherwise({
			redirectTo: '/404'
		});
	}]);
angular.module('MyApp')
.controller('GroupCreateCtrl', ['$scope', '$rootScope', '$location', 'Group',
	function($scope, $rootScope, $location, Group) {
		$scope.createGroup = function(){
			Group.save({
				name: $scope.name,
				activity: $scope.activity,
				venue_location: [$scope.locationLat, $scope.locationLong]
			}).$promise.then(function(response){
				alert("Group has been added!");
				$location.path('/groups/' + response._id);
			});
		};
	}]);
angular.module('MyApp')
.controller('GroupEditCtrl', ['$scope', '$rootScope', '$routeParams', 'Group',
	function($scope, $rootScope, $routeParams, Group) {
		Group.get({ _id: $routeParams.id }, function(group) {
			$scope.group = group;
		});

		$scope.editGroup = function(){
			Group.update({
				_id: $routeParams.id,
				name: $scope.group.name,
				activity: $scope.group.activity,
				venue_location: [$scope.group.venue_location[0], $scope.group.venue_location[1]],
				date_created: $scope.group.date_created
			}).$promise.then(function(response){
			});
		};
	}]);
angular.module('MyApp')
.controller('GroupCtrl', ['$scope', '$location', '$routeParams', 'Group',
	function($scope, $location, $routeParams, Group){
		Group.get({ _id: $routeParams.id }, function(group) {
			$scope.group = group;

			$scope.map = {
				center:{
					latitude: group.venue_location[0],
					longitude: group.venue_location[1]
				},
				zoom: 15
			};

			$scope.marker = {
				id: 0,
				coords: {
					latitude: group.venue_location[0],
					longitude: group.venue_location[1]
				}
			}
		});

		$scope.editButton = function(){
			console.log("/groups/"+$routeParams.id+"/edit");
			$location.path("/groups/"+$routeParams.id+"/edit");
		};

		$scope.deleteButton = function(){
			Group.remove({_id: $routeParams.id}).$promise.then(function(response){
				alert("Group has been deleted!");
				$location.path('/');
			});
		};
	}]);
angular.module('MyApp')
  .controller('GroupsCtrl', ['$scope', 'Group', function($scope, Group) {
    $scope.groups = Group.query();
  }]);
angular.module('MyApp')
	.controller('HomeCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore){
		$scope.auth = $cookieStore.get('userid');
	}]);
angular.module('MyApp')
  .controller('UserCtrl', ['$scope', '$rootScope', '$routeParams', 'User', 
	function($scope, $rootScope, $routeParams, User) {
		User.get({ _id: $routeParams.id }, function(user) {
			$scope.user = user;
		});
	}]);
angular.module('MyApp')
  .controller('UsersCtrl', ['$scope', 'User', function($scope, User) {
    $scope.users = User.query();
  }]);
angular.module('MyApp').factory('Group', ['$resource', function($resource) {
	return $resource('/api/groups/:_id', {}, {
		update: {method: 'PUT', params: {_id: '@_id'}}
	});
}]);
angular.module('MyApp').factory('User', ['$resource', function($resource) {
	return $resource('/api/users/:_id');
}]);