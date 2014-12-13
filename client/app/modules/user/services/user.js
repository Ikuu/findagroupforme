angular.module('app.user')
.factory('User', function($resource) {
	return $resource('/api/users/:_id', {}, {
		update:{
			method: 'PUT',
			params: {_id: '@_id'}
		}
	});
});