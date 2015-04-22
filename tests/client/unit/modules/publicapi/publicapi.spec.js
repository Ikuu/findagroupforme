'use strict';

describe('PublicApi.PublicApiController', function() {
  var $rootScope, $httpBackend, $controller;
  var session, createApiKey, deleteApiKey, regenApiKey;
  var controller, createController;
  var apiKey;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');

    session = $httpBackend
                .when('GET', '/api/users/session/active')
                .respond(SignedInUser.mockSessionData());
    createApiKey = $httpBackend
                .when('PUT', '/api/users/publicApi/create')
                .respond(SignedInUser.mockApiData());
    deleteApiKey = $httpBackend
                .when('DELETE', '/api/users/publicApi/delete')
                .respond(SignedInUser.mockSessionData());
    regenApiKey = $httpBackend
                .when('PUT', '/api/users/publicApi/regen')
                .respond(SignedInUser.mockApiDataRegen());

    createController = function() {
      return $controller('PublicApiController', {});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load user details", function() {
    controller = createController();
    $httpBackend.flush();

    expect(controller.hasKey).toBe(false);
  });

  it("should add api key", function() {
    controller = createController();
    controller.generateKey();
    $httpBackend.flush();

    expect(controller.hasKey).toBe(true);
    apiKey = controller.apiDetails.key;
    expect(controller.apiDetails.project).toBe('New Application');
  });

  it("should regen api key", function() {
    controller = createController();
    controller.regenerateKey();
    $httpBackend.flush();

    expect(controller.hasKey).toBe(true);
    expect(controller.apiDetails.key).not.toEqual(apiKey);
  });

  it("should delete api key", function() {
    controller = createController();
    controller.deleteKey();
    $httpBackend.flush();

    expect(controller.hasKey).toBe(false);
  });
});