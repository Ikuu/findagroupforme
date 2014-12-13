angular.module('app.core')
.factory('Session', function($http) {
	var Session = {
		username: '',
		userid: '',
		isLoggedIn: false,
		init: function() {
			$http.get('/session').success(function(data){
				Session.username = data.username;
				Session.isLoggedIn = true;
			});
		}
	};

	Session.init();
	return Session;
});