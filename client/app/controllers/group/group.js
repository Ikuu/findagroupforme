angular.module('MyApp')
.controller('GroupCtrl', ['$scope', '$cookies', '$location', '$routeParams', 'Group',
	function($scope, $cookies, $location, $routeParams, Group){
		Group.get({ _id: $routeParams.id }, function(group) {
			$scope.group = group;
		});

		$scope.editButton = function(){
			console.log($cookies);
			console.log("/groups/"+$routeParams.id+"/edit");
			$location.path("/groups/"+$routeParams.id+"/edit");
		};

		$scope.deleteButton = function(){
			console.log("button clicked");
			Group.remove({_id: $routeParams.id}).$promise.then(function(response){
				alert("Group has been deleted!");
				$location.path('/');
			});
		};
	}]);