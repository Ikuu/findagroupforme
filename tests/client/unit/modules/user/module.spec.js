describe("app.user Routes Test", function() {
  beforeEach(module('app.user'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/users'].controller)
        .toBe('UsersController');
      expect($route.routes['/users'].templateUrl)
        .toEqual('/app/user/users.html');

      expect($route.routes['/user/:id'].controller)
        .toBe('UserController');
      expect($route.routes['/user/:id'].templateUrl)
        .toEqual('/app/user/user.html');
    });
  });
});