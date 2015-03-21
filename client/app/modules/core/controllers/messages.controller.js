angular.module('app.core')
.controller('MessagesController', function($scope, $routeParams, User, Title, $http) {
	Title.set('Messages');
	getUserDetails();

	function getUserDetails() {
		User.getSignedInUser({}, function(user) {
			$scope.user = user;
		});
	};

	$scope.deleteMessage = function(messageId) {
		$http.delete('/api/message/delete/' + messageId).success(function(response) {
			if (response.message === 'message was deleted.') {
				getUserDetails();
			}
		});
	};

	$scope.markAsViewed = function(messageId) {
		$http.post('/api/message/viewed/' + messageId).success(function(response) {
			getUserDetails();
		});
	};

	$scope.markAsUnviewed = function(messageId) {
		$http.post('/api/message/unviewed/' + messageId).success(function(response) {
			getUserDetails();
		});
	};
});