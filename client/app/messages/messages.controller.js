(function() {
  angular
    .module('app.messages')
    .controller('MessagesController', MessagesController);

  function MessagesController(User, Title, $http) {
    var vm = this;
    vm.deleteMessage = deleteMessage;
    vm.markAsUnviewed = markAsUnviewed;
    vm.markAsViewed = markAsViewed;

    Title.set('Messages');
    getUserDetails();
  
    function getUserDetails() {
      User.getSignedInUser({}, function(user) {
        vm.user = user;
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
  }
})();