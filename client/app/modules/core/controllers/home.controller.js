(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('HomeController', HomeController);

	function HomeController(Title) {
		var vm = this;
		
		Title.set('Home');
	}
})();