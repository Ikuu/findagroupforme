(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('UserController', UserController);

  function UserController($routeParams, User, Title) {
    var vm = this;
    vm.private = false;
    vm.user;

    User.get({ _id: $routeParams.id }, function(user) {
      vm.user = user;
      if (!vm.user.name) {
        vm.private = true;
      }

      Title.set(user.username);
    });
  }
})();