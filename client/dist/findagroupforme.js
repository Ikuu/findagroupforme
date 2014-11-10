/*! findagroupforme - v0.0.0 - 2014-11-10 */angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
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
angular.module('MyApp')
  .controller('DetailCtrl', ['$scope', '$rootScope', '$routeParams', 'User',
    function($scope, $rootScope, $routeParams, User) {
      User.get({ _id: $routeParams.id }, function(user) {
        $scope.user = user;
      });
    }]);
angular.module('MyApp')
  .controller('GroupCtrl', ['$scope', '$rootScope', '$routeParams', 'Group',
    function($scope, $rootScope, $routeParams, Group) {
      Group.get({ _id: $routeParams.id }, function(group) {
        $scope.group = group;
      });
    }]);
angular.module('MyApp')
  .controller('GroupsCtrl', ['$scope', 'Group', function($scope, Group) {
    $scope.groups = Group.query();
  }]);
angular.module('MyApp')
  .controller('UsersCtrl', ['$scope', 'User', function($scope, User) {
    $scope.users = User.query();
  }]);
angular.module('MyApp')
  .factory('Group', ['$resource', function($resource) {
  	return $resource('/api/groups/:_id');
  }]);
angular.module('MyApp')
  .factory('User', ['$resource', function($resource) {
  	return $resource('/api/users/:_id');
  }]);