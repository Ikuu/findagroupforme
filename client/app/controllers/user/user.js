angular.module('MyApp')
  .controller('UserCtrl', ['$scope','$routeParams', 'User', '$location',
  	function($scope, $routeParams, User, $location) {
  		User.get({ _id: $routeParams.id }, function(user){
  			$scope.user = user;
		}, function(response){
			if (response.status === 403){
				$location.path('/login');
			}
		});
	}]);