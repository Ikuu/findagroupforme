describe("app.whatson Routes Test", function() {
  beforeEach(module('app.whatson'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/whatson'].controller)
        .toBe('WhatsOnController');
      expect($route.routes['/whatson'].templateUrl)
        .toEqual('/app/whatson/whatson.html');
    });
  });
});