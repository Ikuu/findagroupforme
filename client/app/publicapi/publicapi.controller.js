(function() {
	'use strict';

	angular
		.module('app.publicApi')
		.controller('PublicApiController', Controller);

	function Controller(User, Title, $http) {
		var vm = this;

		vm.apiDetails = {};
		vm.deleteKey = deleteKey;
		vm.generateKey = generateKey;
		vm.hasKey = false;
		vm.projectTitle = '';
		vm.regenerateKey = regenerateKey;

		Title.set('Public API');
		activate();

		function activate() {
			User.getSignedInUser({}, function(response) {
				loadUserDetails(response);
			});
		}

		function loadUserDetails(details) {
			if (typeof details.api !== 'undefined') {
				vm.apiDetails = details.api;
				vm.hasKey = true;
			}
			else {
				vm.apiDetails = {};
				vm.hasKey = false;
			}
		}

		function deleteKey() {
			$http.delete('/api/users/publicApi/delete')
				.success(function(response) {
					if (response.error) {

					}
					else {
						loadUserDetails(response);						
					}
				});
		}

		function generateKey() {
			$http.put('/api/users/publicApi/create', { api: { project: vm.projectTitle } })
				.success(function(response) {
					if (response.error) {

					}
					else {
						vm.projectTitle = '';
						loadUserDetails(response);
					}
				});
		}

		function regenerateKey() {
			$http.put('/api/users/publicApi/regen')
				.success(function(response) {
					if (response.error) {

					}
					else {
						loadUserDetails(response);
					}
				});
		}
	}
})();