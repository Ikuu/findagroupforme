angular.module('app.user')
.factory('User', function($resource) {
	return $resource('/api/users/:_id', {}, {
		update: {
			method: 'PUT',
			params: {_id: '@_id'}
		},
		getSignedInUser: {
			method: 'GET',
			url: '/api/users/session/active'
		},
		findMatchmakingGroups: {
			method: 'GET',
			isArray: true,
			url: '/api/groups/add/mm'
		},
		updateAddress : {
			method: 'PUT',
			url: 'api/users/address/update'
		},
		addInterest: {
			method: 'POST',
			params: { interest: '@interest' },
			url: '/api/users/interest/add/:interest'
		},
		removeInterest: {
			method: 'DELETE',
			params: { interest: '@interest' },
			url: '/api/users/interest/remove/:interest'
		}
	});
});