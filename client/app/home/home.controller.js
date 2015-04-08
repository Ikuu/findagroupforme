(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	function HomeController(Title) {
		var vm = this;
		
		Title.set('Home');
	}
})();