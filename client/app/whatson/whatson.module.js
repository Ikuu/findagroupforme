(function() {
  'use strict';

  angular
    .module('app.whatson', [
      'ngRoute',
      'google-maps'.ns()
    ])
    .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/whatson', {
      templateUrl: '/app/whatson/whatson.html',
      controller: 'WhatsOnController',
      controllerAs: 'vm'
    });
  }
})();