angular.module('MyApp')
.controller('GroupEditCtrl', ['$scope', '$rootScope', '$routeParams', 'Group',
	function($scope, $rootScope, $routeParams, Group) {
		Group.get({ _id: $routeParams.id }, function(group) {
			$scope.group = group;
		});

		$scope.editButton = function(){
			alert("Edit Button not implemented.");
		};
	}]);