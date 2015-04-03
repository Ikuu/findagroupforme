(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('404Controller', Controller);

	function Controller(Title, User) {
		Title.set('404 Error');

		console.log(User.query());
	}
})();