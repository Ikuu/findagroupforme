describe("app.core Routes Test", function() {
  beforeEach(module('app.core'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/about'].controller).toBe('AboutController');
      expect($route.routes['/about'].templateUrl).toEqual('/app/core/about.html');

      expect($route.routes['/404'].controller).toBe('404Controller');
      expect($route.routes['/404'].templateUrl).toEqual('/app/core/404.html');

      expect($route.routes[null].redirectTo).toEqual('/404');
    });
  });
});