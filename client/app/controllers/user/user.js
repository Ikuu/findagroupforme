angular.module('MyApp')
  .controller('UserCtrl', ['$scope', '$rootScope', '$routeParams', 'User', 
	function($scope, $rootScope, $routeParams, User) {
		User.get({ _id: $routeParams.id }, function(user) {
			$scope.user = user;
		});
	}]);