(function() {
	'use strict';

	angular
		.module('app.group')
		.controller('GroupEditController', GroupEditController);

	function GroupEditController($location, $routeParams, Group, Title) {
		var vm = this;

		vm.editGroup = editGroup;
		vm.group = {};
		vm.groupMarker = {};
		vm.map = {};

		loadGroupDetails();

		function loadGroupDetails() {
			Group.get({ _id: $routeParams.id }, function(group) {
				Title.set('Editing ' + group.name);
				vm.group = group;
	
				vm.map = {
					center: vm.group.location.coordinates,
					zoom: 12
				};
	
				vm.groupMarker = {
					id: 0,
					options: {
						title: "You!",
						icon: {
							url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
						},
						draggable: true
					},
					events: {
						dragend: function(marker, eventName, args) {
							vm.group.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
						}
					},
					coords: vm.group.location.coordinates
				};
			});
		}

		function editGroup() {
			Group.update(vm.group).$promise.then(function(response) {
				if (response.message == "group has been updated.") {
					alert("updated");
					loadGroupDetails();
				}
			});
		}
	}
})();