angular.module('MyApp')
  .controller('GroupsCtrl', ['$scope', 'Group', function($scope, Group) {
    $scope.groups = Group.query();
  }]);