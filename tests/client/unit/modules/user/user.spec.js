'use strict';

describe('User.UserController', function() {
  var $rootScope, $httpBackend, $controller, $location;
  var user;
  var controller, createController, location;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    location = $location;

    user = $httpBackend
                .when('GET', '/api/users/552e3790943aa0e9a8d9ea2b')
                .respond(Users.single());

    createController = function() {
      return $controller('UserController', { $routeParams: { id: '552e3790943aa0e9a8d9ea2b' } });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load users details", function() {
    controller = createController();
    $httpBackend.flush();

    expect(controller.user.email).toBe('alex@email.com');
  });

  it("should forward if error", function() {
    spyOn(location, 'path');
    user.respond({ error: 'error' });
    controller = createController();
    $httpBackend.flush();
    expect(location.path).toHaveBeenCalledWith('/404');
  });

  it("should return private profile", function() {
    user.respond(Users.private());
    controller = createController();
    $httpBackend.flush();

    expect(controller.private).toBe(true);
  });
});