angular.module('app.core')
.controller('MatchmakingController', function($scope, Title, Matchmaking) {
	Title.set('Matchmaking');
	$scope.message = "Search for a group first!";

	$scope.findMatchmakingGroup = function(interest) {
		Matchmaking.searchForGroup({ interest: interest.toLowerCase() }).$promise.then(function(response) {
			if (response.message === "not enough matches to make group") {
				$scope.message = response.message;
			}
			if (response.message === "temp group has been made, and messages sent.") {
				$scope.message = "Group has been formed: " + response.group._id;
			}
		});
	};
});