'use strict';

describe('Whatson.WhatsOnController', function() {
  var $rootScope, $httpBackend, $controller;
  var session, groups;
  var controller, createController;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');

    session = $httpBackend
                .when('GET', '/session')
                .respond(SignedInUser.mockSessionData());
    groups = $httpBackend
                .when('GET', '/api/groups/public/events')
                .respond({});

    createController = function() {
      return $controller('WhatsOnController', {});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load with no events", function() {
    groups.respond(WhatsOn.noEvents());
    controller = createController();
    $httpBackend.flush();

    expect(controller.noEvents).toBe(true);
  });

  it("should load with events", function() {
    groups.respond(WhatsOn.events());
    controller = createController();
    $httpBackend.flush();

    expect(controller.noEvents).toBe(false);
    expect(controller.eventMarkerList.length).toBe(1);
  });
});