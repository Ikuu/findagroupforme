angular.module('app.core')
.factory('UserFactory', function($http) {
	return {
		getUser: getUser
	};

	function getUser(){
		return $http.get('/session');
	}
});