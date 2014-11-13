/*! findagroupforme - v0.0.0 - 2014-11-13 */angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	//$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: '/app/views/home.html'
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
				activity: $scope.activity
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

		$scope.editButton = function(){
			alert("Edit Button not implemented.");
		};
	}]);
angular.module('MyApp')
.controller('GroupCtrl', ['$scope', '$rootScope', '$routeParams', 'Group',
	function($scope, $rootScope, $routeParams, Group) {
		Group.get({ _id: $routeParams.id }, function(group) {
			$scope.group = group;
		});

		$scope.editButton = function(){
			alert("Edit Button not implemented.");
		};

		$scope.deleteButton = function(){
			alert("Delete Button not implemented.");
		};
	}]);
angular.module('MyApp')
  .controller('GroupsCtrl', ['$scope', 'Group', function($scope, Group) {
    $scope.groups = Group.query();
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
	return $resource('/api/groups/:_id');
}]);
angular.module('MyApp').factory('User', ['$resource', function($resource) {
	return $resource('/api/users/:_id');
}]);