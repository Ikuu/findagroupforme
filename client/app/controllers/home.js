angular.module('MyApp')
.controller('HomeCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore){
	$scope.auth = $cookieStore.get('userid');
}]);