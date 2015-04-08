(function() {
	'use strict';

	angular
		.module('app.group')
		.factory('Group', Group);

	function Group($resource) {
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
				method: 'DELETE',
				url: '/api/groups/:_id/removeUser',
				params: {_id: '@_id'}
			},
			addEvent: {
				method: 'PUT',
				url: '/api/groups/:_id/event',
				params: {_id: '@_id'}
			},
			removeEvent: {
				method: 'DELETE',
				url: '/api/groups/:_id/event/:event_id',
				params: {_id: '@_id', event_id: '@event_id'}
			}
		});
	}
})();