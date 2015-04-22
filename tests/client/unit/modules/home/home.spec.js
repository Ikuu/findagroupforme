'use strict';

describe('Home.HomeController', function() {
  var $rootScope, $httpBackend, $controller;
  var session;
  var controller, createController;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');

    session = $httpBackend
                .when('GET', '/session')
                .respond(SignedInUser.mockSessionData());

    createController = function() {
      return $controller('HomeController', {});
    }
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load group details", function() {
    controller = createController();
    $httpBackend.flush();

    expect(controller.userMarker.coords[0]).toBe(-4.262475);
    expect(controller.userMarker.coords[1]).toBe(55.861754);
    expect(controller.user.groups.length).toBe(3);
  });
});