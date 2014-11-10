angular.module('MyApp')
  .factory('User', ['$resource', function($resource) {
  	return $resource('/api/users/:_id');
  }]);