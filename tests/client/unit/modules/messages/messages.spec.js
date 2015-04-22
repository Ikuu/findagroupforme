'use strict';

describe('Messages.MessagesController', function() {
  var $rootScope, $httpBackend, $controller;
  var session, deleteMessage, markAsUnviewed, markAsViewed;
  var controller, createController;

  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $controller = $injector.get('$controller');

    session = $httpBackend
                .when('GET', '/api/users/session/active')
                .respond(Messages.mockData());
    deleteMessage = $httpBackend
                .when('DELETE', '/api/message/delete/1')
                .respond({});
    markAsViewed = $httpBackend
                  .when('POST', '/api/message/viewed/1')
                  .respond({});
    markAsUnviewed = $httpBackend
                  .when('POST', '/api/message/unviewed/1')
                  .respond({});
    createController = function() {
      return $controller('MessagesController', {});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should load messages", function() {
    controller = createController();
    $httpBackend.flush();

    expect(controller.user.messages.length).toBe(2);
  });

  it("should delete message", function() {
    session.respond(Messages.mockDeleteData());
    controller = createController();
    controller.deleteMessage(1);
    $httpBackend.flush();
    expect(controller.user.messages.length).toBe(1);
  });

  it("should mark as viewed", function() {
    controller = createController();
    controller.markAsViewed(1);
    $httpBackend.flush();

    expect(controller.user.messages[0].viewed).toBe(true);
  });

  it("should mark as unviewed", function() {
    session.respond(Messages.mockUnviewedData());
    controller = createController();
    controller.markAsUnviewed(1);
    $httpBackend.flush();
    expect(controller.user.messages[0].viewed).toBe(false);
  });
});