(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('LoginController', LoginController);

	function LoginController(Title) {
		Title.set('Login');
	}
})();