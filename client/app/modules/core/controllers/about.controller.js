(function() {
	'use strict';
	
	angular
		.module('app.core')
		.controller('AboutController', AboutController);	

	function AboutController($scope, Title) {
		Title.set('About');
	}
})();