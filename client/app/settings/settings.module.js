(function() {
  'use strict';

  angular
    .module('app.settings', [
      'ngRoute',
      'google-maps'.ns()
    ])
    .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/settings', {
      templateUrl: '/app/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'vm'
    });
  }
})();