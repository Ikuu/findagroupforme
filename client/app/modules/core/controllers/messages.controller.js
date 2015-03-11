angular.module('app.core')
.controller('MessagesController', function($scope, $routeParams, User, Title, $http, $route){
	Title.set('Messages');

	User.getSignedInUser({}, function(user) {
		$scope.user = user;
	});

	$scope.deleteMessage = function(messageId) {
		$http.delete('/api/message/delete/' + messageId).success(function(response) {
			if (response.message === 'message was deleted.') {
				$route.reload();
			}
		});
	};

	$scope.markAsViewed = function(messageId) {
		$http.post('/api/message/viewed/' + messageId).success(function(response) {
		});
	};

	$scope.markAsUnviewed = function(messageId) {
		$http.post('/api/message/unviewed/' + messageId).success(function(response) {
		});
	};
});