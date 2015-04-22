'use strict';

describe('Group.GroupEditController', function() {
  var $rootScope, $httpBackend, $controller;
  var group, session, editGroup;
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
    editGroup = $httpBackend
                .when('PUT', '/api/groups')
                .respond({ message: 'group has been updated.'});

    createController = function() {
      return $controller('GroupEditController', { '$scope': $rootScope });
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

  it("should edit group", function() {
    spyOn(window, 'alert');
    controller = createController();
    controller.editGroup();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('Group has been updated!');    
  });

  it("should not edit group", function() {
    spyOn(window, 'alert');
    editGroup.respond({});
    controller = createController();
    controller.editGroup();
    $httpBackend.flush();
    expect(window.alert).not.toHaveBeenCalledWith('Group has been updated!');    
  });
});