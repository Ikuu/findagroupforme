angular.module('MyApp').factory('Session', ['$http', function($http) {
	var Session = {
		data: {},
		getData: function() {
			$http.get('/session').then(function(res){
				Session.data = res.data;
			});
		}
	};

	Session.getData();
	return Session;
}]);