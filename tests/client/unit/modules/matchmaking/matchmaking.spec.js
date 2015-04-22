'use strict';

describe('Matchmaking.MatchmakingController', function() {
  var $rootScope, $httpBackend, $controller;
  var findGroup;
  var controller, createController;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');

    findGroup = $httpBackend
                  .when('POST', '/api/match')
                  .respond({});

    createController = function() {
      return $controller('MatchmakingController', {});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load user details", function() {
    controller = createController();
    expect(controller.message).toBe('Search for a interest first!');
  });

  it("should return message based on not forming a group", function() {
    controller = createController();
    findGroup.respond({ message: "not enough matches to make group" });
    controller.findMatchmakingGroup();
    $httpBackend.flush();
    expect(controller.message).toBe('Not enough matches to make a group. You will be sent a message if a match is found.');
  });

  it("should return message based on forming a group", function() {
    var groupId = '54bf8b8666a4350000a8378c'

    controller = createController();
    findGroup.respond({
      message: "temp group has been made, and messages sent.",
      group: {
        _id: groupId
      }
    });
    controller.findMatchmakingGroup();
    $httpBackend.flush();
    expect(controller.groupFound).toBe(true);
    expect(controller.groupId).toBe(groupId);
  });
});