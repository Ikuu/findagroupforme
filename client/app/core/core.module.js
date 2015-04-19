(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngRoute'
    ])
    .config(config);

  function config($routeProvider){
    $routeProvider
      .when('/404', {
        templateUrl: '/app/core/404.html',
        controller: '404Controller',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/app/core/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/404'
      });
  }
})();