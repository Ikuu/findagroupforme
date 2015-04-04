(function() {
	'use strict';

	angular
		.module('app.registration')
		.controller('LoginController', LoginController);

	function LoginController(Title) {
		Title.set('Login');
	}
})();