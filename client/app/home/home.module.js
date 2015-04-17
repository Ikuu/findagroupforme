(function() {
  'use strict';

  angular
    .module('app.home', [
      'ngRoute',
      'google-maps'.ns()
    ])
    .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    });
  }
})();