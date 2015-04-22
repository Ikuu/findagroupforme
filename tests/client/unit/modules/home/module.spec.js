describe("app.home Routes Test", function() {
  beforeEach(module('app.home'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/'].controller).toBe('HomeController');
      expect($route.routes['/'].templateUrl).toEqual('/app/home/home.html');
    });
  });
});