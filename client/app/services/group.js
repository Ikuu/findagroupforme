angular.module('MyApp').factory('Group', ['$resource', function($resource) {
	return $resource('/api/groups/:_id', {}, {
		update: {
			method: 'PUT',
			params: {_id: '@_id'}
		},
		addUser: {
			method: 'PUT',
			url: '/api/groups/:_id/addUser',
			params: {_id: '@_id'}
		},
		removeUser: {
			method: 'PUT',
			url: '/api/groups/:_id/removeUser',
			params: {_id: '@_id'}
		}
	});
}]);