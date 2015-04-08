(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('MenuBarController', MenuBarController);

	function MenuBarController($scope, UserFactory) {
		var vm = this;
		vm.loggedIn = false;

		$scope.$on('checkForMessage', loadUserDetails);
	
		function loadUserDetails() {
			UserFactory.getUser().then(function success(response) {
				vm.loggedInUser = response.data;
				if (response.data.username) {
					vm.loggedIn = true;
					vm.numberOfMessages = response.data.messages.length;
				}
			});
		}
	}
})();