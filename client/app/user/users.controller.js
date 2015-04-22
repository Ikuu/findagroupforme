(function() {
  angular
    .module('app.user')
    .controller('UsersController', UsersController);

  function UsersController(User, Title) {
    var vm = this;
    vm.users = [];

    User.query({}, function(response) {
      vm.users = response;
    });

    Title.set('Users');
  }
})();