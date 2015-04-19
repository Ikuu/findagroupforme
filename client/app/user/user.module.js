(function() {
  'use strict';
  angular
    .module('app.user', [
      'ngRoute',
      'google-maps'.ns()
    ])
    .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/users', {
      templateUrl: '/app/user/users.html',
      controller: 'UsersController',
      controllerAs: 'vm'
    })
    .when('/user/:id', {
      templateUrl: '/app/user/user.html',
      controller: 'UserController',
      controllerAs: 'vm'
    });
  }
})();