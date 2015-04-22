'use strict';

describe('Group.GroupsController', function() {
  var $httpBackend, $controller;
  var groups, session, interest;
  var controller, createController;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');

    groups = $httpBackend
                .when('GET', '/api/groups')
                .respond(Groups.mockData());
    session = $httpBackend
                .when('GET', '/api/users/session/active')
                .respond(SignedInUser.mockData());
    interest = $httpBackend
                .when('GET', '/api/groups/interest/soccer')
                .respond(Groups.mockInterestData());

    createController = function() {
      return $controller('GroupsController', {});
    }
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should create map objects", function() {
    $httpBackend.expectGET('/api/users/session/active');
    controller = createController();
    $httpBackend.flush();

    expect(controller.map.center[0]).toBe(-4.262475);
    expect(controller.map.center[1]).toBe(55.861754);
    expect(controller.userMarker.coords[0]).toBe(-4.262475);
    expect(controller.userMarker.coords[1]).toBe(55.861754);
    expect(controller.groupMarkerList.length).toBe(7);
  });

  it("should return all groups", function() {
    $httpBackend.expectGET('/api/groups');
    controller = createController();
    $httpBackend.flush();

    expect(controller.groups.length).toBe(7);
    expect(controller).toBeDefined();
  });

  it("should return groups with interest soccer", function() {
    $httpBackend.expectGET('/api/groups/interest/soccer');
    controller = createController();
    controller.interest = 'soccer';
    controller.findInterest();
    $httpBackend.flush();

    expect(controller.groups[0].interest).toBe('soccer');
    expect(controller.groupMarkerList.length).toBe(1);
    expect(controller).toBeDefined();
  });
});