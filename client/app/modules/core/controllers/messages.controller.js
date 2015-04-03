(function() {
	angular
		.module('app.core')
		.controller('MessagesController', function($scope, $routeParams, User, Title, $http) {
		Title.set('Messages');
		$scope.deleteMessage = deleteMessage;
		$scope.markAsUnviewed = markAsUnviewed;
		$scope.markAsUnviewed = markAsViewed;

		getUserDetails();
	
		function getUserDetails() {
			User.getSignedInUser({}, function(user) {
				$scope.user = user;
			});
		}
	
		function deleteMessage(messageId) {
			$http.delete('/api/message/delete/' + messageId).success(function(response) {
				if (response.message === 'message was deleted') {
					getUserDetails();
				}
			});
		}
	
		function markAsViewed(messageId) {
			$http.post('/api/message/viewed/' + messageId).success(function(response) {
				getUserDetails();
			});
		}
	
		function markAsUnviewed(messageId) {
			$http.post('/api/message/unviewed/' + messageId).success(function(response) {
				getUserDetails();
			});
		}
	});
})();