describe("app.publicApi Routes Test", function() {
  beforeEach(module('app.publicApi'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/publicapi'].controller)
        .toBe('PublicApiController');
      expect($route.routes['/publicapi'].templateUrl)
        .toEqual('/app/publicapi/publicapi.html');
    });
  });
});