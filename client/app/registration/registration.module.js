(function() {
  'use strict';

  angular
    .module('app.registration', [
      'ngRoute',
      'google-maps'.ns()
    ])
    .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/login', {
      templateUrl: '/app/registration/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .when('/signup', {
      templateUrl: '/app/registration/signup.html',
      controller: 'SignupController',
      controllerAs: 'vm'
    })
    // To handle Facebook Login
    .when('/_=_', {
      redirectTo: '/'
    });
  }
})();