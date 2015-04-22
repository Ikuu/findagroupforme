describe("app.settings Routes Test", function() {
  beforeEach(module('app.settings'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/settings'].controller)
        .toBe('SettingsController');
      expect($route.routes['/settings'].templateUrl)
        .toEqual('/app/settings/settings.html');
      expect($route.routes['/settings/:message'].controller)
        .toBe('SettingsController');
      expect($route.routes['/settings/:message'].templateUrl)
        .toEqual('/app/settings/settings.html');
    });
  });
});