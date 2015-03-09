angular.module('app.core')
.controller('MatchmakingController', function($scope, Title, Matchmaking) {
	Title.set('Matchmaking');

	$scope.findMatchmakingGroup = function() {
		Matchmaking.searchForGroup({ interest: 'soccer' }).$promise.then(function(response) {
			console.log(response);
		});
	};
});