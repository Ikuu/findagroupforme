(function() {
	angular
		.module('app.core')
		.controller('MatchController', MatchController);

	function MatchController(Title, $routeParams, $http, $location) {
		var vm = this;
		vm.acceptedByDate
		vm.acceptButton = acceptButton;
		vm.declineButton = declineButton;
		vm.tempGroup = [];
		Title.set('Matchmaking Group');

		retrieveMatchDetails();

		function acceptButton() {
			$http.post('/api/tempGroup/invite/accept/'+ $routeParams.id).success(function(response) {
				retrieveMatchDetails();	
			});
		}
	
		function declineButton() {
			$http.post('/api/tempGroup/invite/decline/'+ $routeParams.id).success(function(response) {
				retrieveMatchDetails();
			});
		}

		function retrieveMatchDetails() {
			$http.get('/api/tempGroup/'+$routeParams.id).success(function(response) {
				if (response.message === "error") {
					$location.path('/');
				}

				vm.tempGroup = response;
				vm.acceptedByDate = new Date(response.date_created);
				vm.acceptedByDate.setDate(vm.acceptedByDate.getDate() + 7);
			});
		}
	}
})();