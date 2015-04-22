describe("app.registration Routes Test", function() {
  beforeEach(module('app.registration'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/login'].controller)
        .toBe('LoginController');
      expect($route.routes['/login'].templateUrl)
        .toEqual('/app/registration/login.html');

      expect($route.routes['/login/:error'].controller)
        .toBe('LoginController');
      expect($route.routes['/login/:error'].templateUrl)
        .toEqual('/app/registration/login.html');

      expect($route.routes['/signup'].controller)
        .toBe('SignupController');
      expect($route.routes['/signup'].templateUrl)
        .toEqual('/app/registration/signup.html');

      expect($route.routes['/_=_'].redirectTo)
        .toEqual('/')
    });
  });
});