'use strict';

describe('Registration.SignupController', function() {
  var $rootScope, $httpBackend, $controller, $location;
  var createUser;
  var controller, createController, location;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    location = $location;

    createUser = $httpBackend
                .when('POST', '/api/users')
                .respond();

    createController = function() {
      return $controller('SignupController', {});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should add user", function() {
    spyOn(location, 'path');
    controller = createController();
    controller.user = {
      username: 'Ikuu'
    };
    controller.createUser(true);
    $httpBackend.flush();

    expect(location.path).toHaveBeenCalledWith('/login');
  });

  it("should fail to add user as isValid is false", function() {
    spyOn(location, 'path');
    controller = createController();
    controller.user = {
      username: 'Ikuu'
    };
    controller.createUser(false);

    expect(location.path).not.toHaveBeenCalledWith('/login');
  });

  it("should fail to add user as username taken", function() {
    spyOn(window, 'alert');
    createUser.respond({ error: { code: 11000 } });
    controller = createController();
    controller.user = {
      username: 'Ikuu'
    };
    controller.createUser(true);
    $httpBackend.flush();

    expect(window.alert).toHaveBeenCalledWith('Username is already in-use!');
  });

  it("should fail to add user as username taken", function() {
    spyOn(window, 'alert');
    createUser.respond({ error: 'error' });
    controller = createController();
    controller.user = {
      username: 'Ikuu'
    };
    controller.createUser(true);
    $httpBackend.flush();

    expect(window.alert).toHaveBeenCalledWith('Error signing up!');
  });
});