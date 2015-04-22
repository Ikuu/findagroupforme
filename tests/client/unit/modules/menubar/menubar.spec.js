'use strict';

describe('Menubar.MenuBarController', function() {
  var $rootScope, $httpBackend, $controller;
  var session;
  var controller, createController, scope;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');

    session = $httpBackend
                .when('GET', '/session')
                .respond(SignedInUser.mockSessionData());

    createController = function() {
      return $controller('MenuBarController', { $scope: $rootScope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load user details", function() {
    controller = createController();
    $rootScope.$broadcast('$routeChangeSuccess');
    $httpBackend.flush();

    expect(controller.loggedIn).toBe(true);
    expect(controller.numberOfMessages).toBe(2);
    expect(controller.loggedInUser.username).toBe('Wong');
  });
});