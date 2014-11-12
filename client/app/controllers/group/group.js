angular.module('MyApp')
.controller('GroupCtrl', ['$scope', '$rootScope', '$routeParams', 'Group',
	function($scope, $rootScope, $routeParams, Group) {
		Group.get({ _id: $routeParams.id }, function(group) {
			$scope.group = group;
		});

		$scope.editButton = function(){
			alert("Edit Button not implemented.");
		};

		$scope.deleteButton = function(){
			alert("Delete Button not implemented.");
		};
	}]);