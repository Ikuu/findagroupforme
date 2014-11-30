angular.module('MyApp')
.controller('GroupCtrl', ['$scope', '$location', '$routeParams', 'Group',
	function($scope, $location, $routeParams, Group){
		$scope.group = Group.get({ _id: $routeParams.id }, function(group) {
			$scope.map = {
				center:{
					latitude: group.venue_location[0],
					longitude: group.venue_location[1]
				},
				zoom: 15
			};

			$scope.marker = {
				id: 0,
				coords: {
					latitude: group.venue_location[0],
					longitude: group.venue_location[1]
				}
			};
		}, function(response){
			if (response.status === 403){
				$location.path('/login');
			}
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