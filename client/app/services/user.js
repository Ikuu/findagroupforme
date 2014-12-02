angular.module('MyApp')
.factory('User', function($resource) {
	return $resource('/api/users/:_id', {}, {
		update:{
			method: 'PUT',
			params: {_id: '@_id'}
		},
		getSignedInUser: {
			method: 'GET',
			url: '/api/users/session/active'
		}
	});
});