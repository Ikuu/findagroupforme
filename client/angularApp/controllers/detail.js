angular.module('MyApp')
  .controller('DetailCtrl', ['$scope', '$rootScope', '$routeParams', 'User',
    function($scope, $rootScope, $routeParams, User) {
      User.get({ _id: $routeParams.id }, function(user) {
        $scope.user = user;
      });
    }]);