angular.module('MyApp')
  .controller('GroupCtrl', ['$scope', '$rootScope', '$routeParams', 'Group',
    function($scope, $rootScope, $routeParams, Group) {
      Group.get({ _id: $routeParams.id }, function(group) {
        $scope.group = group;
      });
    }]);