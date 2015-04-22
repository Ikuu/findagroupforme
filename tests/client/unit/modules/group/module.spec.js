describe("app.group Routes Test", function() {
  beforeEach(module('app.group'));

  it('should map routes to controllers', function() {
    inject(function($route) {
      expect($route.routes['/groups'].controller)
        .toBe('GroupsController');
      expect($route.routes['/groups'].templateUrl)
        .toEqual('/app/group/groups/groups.html');

      expect($route.routes['/groups/:id'].controller)
        .toBe('GroupController');
      expect($route.routes['/groups/:id'].templateUrl)
        .toEqual('/app/group/group.index/group.index.html');

      expect($route.routes['/groups/:id/edit'].controller)
        .toBe('GroupEditController');
      expect($route.routes['/groups/:id/edit'].templateUrl)
        .toEqual('/app/group/group.edit/group.edit.html');

      expect($route.routes['/group/create'].controller)
        .toBe('GroupCreateController');
      expect($route.routes['/group/create'].templateUrl)
        .toEqual('/app/group/group.create/group.create.html');
    });
  });
});
  