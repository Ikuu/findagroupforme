(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', 'Title'];

	function LoginController($scope, Title) {
		Title.set('Login');
	}
})();