(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('404Controller', Controller);

	function Controller(Title) {
		Title.set('404 Error');
	}
})();