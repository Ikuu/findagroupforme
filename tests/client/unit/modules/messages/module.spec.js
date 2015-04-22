describe("app.messages Routes Test", function() {
  beforeEach(module('app.messages'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/messages'].controller)
        .toBe('MessagesController');
      expect($route.routes['/messages'].templateUrl)
        .toEqual('/app/messages/messages.html');
    });
  });
});