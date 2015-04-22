'use strict';

describe('User.UsersController', function() {
  var $rootScope, $httpBackend, $controller;
  var users;
  var controller, createController;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');

    users = $httpBackend
                .when('GET', '/api/users')
                .respond(Users.array());

    createController = function() {
      return $controller('UsersController', {});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load users details", function() {
    controller = createController();
    $httpBackend.flush();

    expect(controller.users[0].name).toBe('Mark');
    expect(controller.users[3].username).toBe('Michale');
  });
});