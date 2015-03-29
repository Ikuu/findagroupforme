//Might want to rename this UserFactory is slighly ambigous
angular.module('app.core')
.factory('UserFactory', function($http) {
	return {
		getUser: getUser
	};

	function getUser() {
		return $http.get('/session');
	}
});