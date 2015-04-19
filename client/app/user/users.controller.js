(function() {
  angular
    .module('app.user')
    .controller('UsersController', UsersController);

  function UsersController(User, Title) {
    var vm = this;
    vm.users = User.query();

    Title.set('Users');
  }
})();