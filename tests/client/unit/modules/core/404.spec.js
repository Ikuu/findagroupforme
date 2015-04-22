describe('Core.404Controller', function() {
  beforeEach(module('app'));
  var Controller404;

  beforeEach(inject(function($controller) {
    scope = {};

    Controller404 = $controller('404Controller', {});
  }))

  it("should be defined", function() {
    expect(Controller404).toBeDefined();
  });
});