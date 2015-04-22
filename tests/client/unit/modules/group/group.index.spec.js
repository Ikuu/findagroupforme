'use strict';

describe('Group.GroupController', function() {
  var $rootScope, $httpBackend, $controller;
  var group, session, deleteGroup, joinGroup, leaveGroup;
  var controller, createController;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');

    group = $httpBackend
                .when('GET', '/api/groups')
                .respond(Groups.singleGroup());
    session = $httpBackend
                .when('GET', '/api/users/session/active')
                .respond(SignedInUser.mockData());
    deleteGroup = $httpBackend
                .when('DELETE', '/api/groups')
                .respond({});
    joinGroup = $httpBackend
                .when('PUT', '/api/groups/addUser')
                .respond({});
    leaveGroup = $httpBackend
                .when('DELETE', '/api/groups/removeUser')
                .respond({});

    createController = function() {
      return $controller('GroupController', { '$scope': $rootScope });
    }
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load group details", function() {
    controller = createController();
    $httpBackend.flush();

    expect(controller.group.interest).toBe('soccer');
    expect(controller.group.members.length).toBe(2);
  });

  it("should return alert when group is deleted", function() {
    spyOn(window, 'alert');
    controller = createController();
    controller.deleteButton();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('Group has been deleted!');
  });

  it("should return message when joining group", function() {
    spyOn(window, 'alert');
    controller = createController();
    controller.joinButton();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('You have joined the group!');
  });

  it("should error return message when joining group", function() {
    spyOn(window, 'alert');
    joinGroup.respond({ error: 'error' });
    controller = createController();
    controller.joinButton();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('Already in this group!');
  });

it("should return message when leaving group", function() {
    spyOn(window, 'alert');
    controller = createController();
    controller.leaveButton();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('You have left the group!');
  });

  it("should error return message when leaving group", function() {
    spyOn(window, 'alert');
    leaveGroup.respond({ error: 'error' });
    controller = createController();
    controller.leaveButton();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('Not in group!');
  });
});