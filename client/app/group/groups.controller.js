(function() {
  angular
    .module('app.core')
    .controller('GroupsController', GroupsController);

  function GroupsController(Group, Title) {
    var vm = this;
    vm.groups = Group.query();

    Title.set('Groups');
  }
})();