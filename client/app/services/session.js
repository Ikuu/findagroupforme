angular.module('MyApp').factory('Session', ['$http', function($http) {
	var Session = {
		data: {},
		isLoggedIn: false,
		getData: function() {
			$http.get('/session').then(function(res){
				Session.data = res.data;
				Session.isLoggedIn = true;
			});
		}
	};

	Session.getData();
	return Session;
}]);