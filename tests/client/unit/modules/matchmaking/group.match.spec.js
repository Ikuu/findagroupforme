'use strict';

describe('Matchmaking.GroupMatchController', function() {
  var $rootScope, $httpBackend, $controller, $location;
  var session, tempGroup, acceptButton, declineButton;
  var controller, createController, location;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    location = $location;

    session = $httpBackend
                .when('GET', '/session')
                .respond(SignedInUser.mockSessionData());
    tempGroup = $httpBackend
                .when('GET', '/api/tempGroup/undefined')
                .respond(TempGroup.mockSingle());
    acceptButton = $httpBackend
                    .when('POST', '/api/tempGroup/invite/accept/undefined')
                    .respond({});
    declineButton = $httpBackend
                    .when('POST', '/api/tempGroup/invite/decline/undefined')
                    .respond({});

    createController = function() {
      return $controller('GroupMatchController', {});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load tempgroup details", function() {
    controller = createController();
    $httpBackend.flush();
    
    var acceptedBy = new Date(controller.tempGroup.date_created);
    acceptedBy.setDate(acceptedBy.getDate() + 7);
    expect(controller.tempGroup.users.length).toBe(3);
    expect(controller.acceptedByDate).toEqual(acceptedBy);
  });

  it("should re-direct if tempgroup is not found", function() {
    spyOn(location, 'path');
    tempGroup.respond({ error: 'error' });
    controller = createController();
    $httpBackend.flush();
    expect(location.path).toHaveBeenCalledWith('/404');
  });

  it("should re-direct to group if match found", function() {
    var groupId = '54bf8b8666a4350000a8378c';
    spyOn(location, 'path');
    acceptButton.respond({ message: 'group formed' ,group: { _id: groupId } });
    controller = createController();
    controller.acceptButton();
    $httpBackend.flush();
    expect(location.path).toHaveBeenCalledWith('/groups/' + groupId);
  });

  it("should re-direct if group not found", function() {
    spyOn(location, 'path');
    acceptButton.respond({ error: 'tempgroup not found' });
    controller = createController();
    controller.acceptButton();
    $httpBackend.flush();
    expect(location.path).toHaveBeenCalledWith('/404');
  });

  it("should re-direct if group not found", function() {
    spyOn(location, 'path');
    declineButton.respond({ error: 'tempgroup not found' });
    controller = createController();
    controller.declineButton();
    $httpBackend.flush();
    expect(location.path).toHaveBeenCalledWith('/404');
  });
});