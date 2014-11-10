angular.module('MyApp')
  .controller('UsersCtrl', ['$scope', 'User', function($scope, User) {
    $scope.users = User.query();
  }]);