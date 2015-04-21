(function() {
  'use strict';

  angular
  .module('app.group', [
    'ngRoute',
    'ngResource',
    'google-maps'.ns(),
    'ui.bootstrap.datetimepicker'
  ])
  .config(config);

  function config($routeProvider) {
    $routeProvider
    .when('/groups', {
      templateUrl: '/app/group/groups/groups.html',
      controller: 'GroupsController',
      controllerAs: 'vm'
    })
    .when('/groups/:id', {
      templateUrl: '/app/group/group.index/group.index.html',
      controller: 'GroupController',
      controllerAs: 'vm'
    })
    .when('/groups/:id/edit', {
      templateUrl: '/app/group/group.edit/group.edit.html',
      controller: 'GroupEditController',
      controllerAs: 'vm'
    })
    .when('/group/create', {
      templateUrl: '/app/group/group.create/group.create.html',
      controller: 'GroupCreateController',
      controllerAs: 'vm'
    });
  }
})();