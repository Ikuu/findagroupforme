angular.module('MyApp')
  .factory('Group', ['$resource', function($resource) {
  	return $resource('/api/groups/:_id');
  }]);