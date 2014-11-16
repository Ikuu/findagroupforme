angular.module('MyApp')
.controller('GroupCtrl', ['$scope', '$cookieStore', '$location', '$routeParams', 'Group',
	function($scope, $cookieStore, $location, $routeParams, Group){
		Group.get({ _id: $routeParams.id }, function(group) {
			$scope.group = group;
		});

		$scope.editButton = function(){
			console.log("/groups/"+$routeParams.id+"/edit");
			$location.path("/groups/"+$routeParams.id+"/edit");
		};

		$scope.deleteButton = function(){
			Group.remove({_id: $routeParams.id}).$promise.then(function(response){
				alert("Group has been deleted!");
				$location.path('/');
			});
		};
	}]);