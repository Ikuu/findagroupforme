'use strict';

describe('Group.GroupCreateController', function() {
  var $rootScope, $httpBackend, $controller;
  var group, session, createGroup;
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
    createGroup = $httpBackend
                .when('POST', '/api/groups')
                .respond({});

    createController = function() {
      return $controller('GroupCreateController', { '$scope': $rootScope });
    }
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should add group and return alert", function() {
    spyOn(window, 'alert');
    controller = createController();
    controller.createGroup();
    $httpBackend.flush();

    expect(window.alert).toHaveBeenCalledWith('Group has been added!');    
  });

  it("should load group details", function() {
    spyOn(window, 'alert');
    createGroup.respond({ error : 'error' });
    controller = createController();
    controller.createGroup();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('Group could not be added');    
  });
});