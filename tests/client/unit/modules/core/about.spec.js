describe('Core.AboutController', function() {
  beforeEach(module('app'));
  var AboutController;

  beforeEach(inject(function($controller) {
    scope = {};

    AboutController = $controller('AboutController', {});
  }))

  it("should be defined", function() {
    expect(AboutController).toBeDefined();
  });
});