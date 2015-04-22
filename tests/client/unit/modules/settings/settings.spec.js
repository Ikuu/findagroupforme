'use strict';

describe('Settings.SettingsController', function() {
  var $rootScope, $httpBackend, $controller;
  var session, interest, match, matchDelete, addRecInterest, addInterest, deleteInterest;
  var editUser, changePassword;
  var controller, createController;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');

    session = $httpBackend
                .when('GET', '/api/users/session/active')
                .respond(SignedInUser.mockData());
    editUser = $httpBackend
                .when('PUT', '/api/users')
                .respond({ message: 'User has been updated' });
    interest = $httpBackend
                .when('GET', '/api/users/interest/find')
                .respond([]);
    match = $httpBackend
                .when('GET', '/api/match/user')
                .respond(Matchmaking.mockUserEntries());
    matchDelete = $httpBackend
                .when('DELETE', '/api/match/remove/0')
                .respond({});
    addRecInterest = $httpBackend
                .when('POST', '/api/users/interest/add/soccer')
                .respond({});
    addInterest = $httpBackend
                .when('POST', '/api/users/interest/add')
                .respond({});
    deleteInterest = $httpBackend
                .when('DELETE', '/api/users/interest/remove/soccer')
                .respond({});
    changePassword = $httpBackend
                .when('PUT', '/api/users/password/update')
                .respond({});

    createController = function() {
      return $controller('SettingsController', {});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load user details", function() {
    controller = createController();
    $httpBackend.flush();

    expect(controller.userMarker.coords[0]).toBe(-4.262475);
    expect(controller.userMarker.coords[1]).toBe(55.861754);
    expect(controller.match.length).toBe(3);
    expect(controller.user.groups.length).toBe(3);
  });

  it("should load matchmaking entries", function() {
    match.respond(Matchmaking.mockUserDeleteEntries());
    controller = createController();
    controller.deleteMatch(0);
    $httpBackend.flush();
    expect(controller.match.length).toBe(2);
  });

  it("should addRecommendedInterest", function() {
    controller = createController();
    controller.addRecommendedInterest('soccer');
    $httpBackend.flush();  
  });

  it("should add interest", function() {
    controller = createController();
    //controller.addInterest();
    $httpBackend.flush();
  });

  it("removeInterest", function() {
    controller = createController();
    controller.removeInterest('soccer');
    $httpBackend.flush();
  });

  it("should edit user", function() {
    spyOn(window, 'alert');
    controller = createController();
    controller.editUser();
    $httpBackend.flush();

    expect(window.alert).toHaveBeenCalledWith('Profile Updated!');
  });

  it("should change password", function() {
    spyOn(window, 'alert');
    controller = createController();
    controller.changePassword();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('Password changed!');
  });

  it("should fail to change password", function() {
    spyOn(window, 'alert');
    changePassword.respond({ error: 'error' });
    controller = createController();
    controller.changePassword();
    $httpBackend.flush();
    expect(window.alert).toHaveBeenCalledWith('error');   
  });
});