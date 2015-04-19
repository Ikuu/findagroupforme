(function() {
  'use strict';

  angular
    .module('app.messages', [
      'ngRoute'
    ])
    .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/messages', {
      templateUrl: '/app/messages/messages.html',
      controller: 'MessagesController',
      controllerAs: 'vm'
    });
  }
})();