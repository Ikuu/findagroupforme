describe("app.matchmaking Routes Test", function() {
  beforeEach(module('app.matchmaking'));
  
  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/matchmaking'].controller)
        .toBe('MatchmakingController');
      expect($route.routes['/matchmaking'].templateUrl)
        .toEqual('/app/matchmaking/matchmaking.html');

      expect($route.routes['/match/:id'].controller)
        .toBe('GroupMatchController');
      expect($route.routes['/match/:id'].templateUrl)
        .toEqual('/app/matchmaking/group.match.html');
    });
  });
});