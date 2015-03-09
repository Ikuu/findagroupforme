angular.module('app.core')
.controller('MatchController', function($scope, Title, $routeParams, $http) {
	Title.set('Matchmaking Group');

	$http.get('/api/tempGroup/'+$routeParams.id).success(function(response) {
		$scope.tempGroup = response;
		$scope.d = new Date(response.date_created);
		$scope.d.setDate($scope.d.getDate() + 7);
	});

	$scope.acceptButton = function(){
		console.log('accept');
	};

	$scope.declineButton = function() {
		console.log('decline');
	};
});