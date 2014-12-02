angular.module('MyApp').factory('Session', function($cookieStore) {
		var Session = {
			data: {},
			username: '',
			userid: '',
			isLoggedIn: false,
			getData: function() {
				Session.data = $cookieStore.get('userid');
				if (Session.data !== undefined) {
					Session.username = Session.data.username;
					Session.userid = Session.data.userid;
					Session.isLoggedIn = true;
				}
			}
		};

		Session.getData();
		return Session;
});