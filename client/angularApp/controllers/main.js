angular.module('MyApp')
  .controller('MainCtrl', ['$scope', 'User', function($scope, User) {
    $scope.users = User.query();
  }]);