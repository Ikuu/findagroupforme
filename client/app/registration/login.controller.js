(function() {
  'use strict';

  angular
    .module('app.registration')
    .controller('LoginController', LoginController);

  function LoginController(Title, $routeParams) {
    Title.set('Login');

    var vm = this;
    vm.failedLogin = failedLogin;

    function failedLogin() {
      return ($routeParams.error === 'error');
    }
  }
})();