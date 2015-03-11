//ngDisabled to 'hide' button https://docs.angularjs.org/api/ng/directive/ngDisabled
angular.module('app.core')
.controller('MatchController', function($scope, Title, $routeParams, $http, $route, $location) {
	Title.set('Matchmaking Group');

	$http.get('/api/tempGroup/'+$routeParams.id).success(function(response) {
		if (response.message === "error") {
			$location.path('/');
		}

		$scope.tempGroup = response;
		$scope.acceptedByDate = new Date(response.date_created);
		$scope.acceptedByDate.setDate($scope.acceptedByDate.getDate() + 7);
	});

	$scope.acceptButton = function() {
		$http.post('/api/tempGroup/invite/accept/'+ $routeParams.id).success(function(response) {
			$route.reload();
		});
	};

	$scope.declineButton = function() {
		$http.post('/api/tempGroup/invite/decline/'+ $routeParams.id).success(function(response) {
			$route.reload();
		});
	};
});