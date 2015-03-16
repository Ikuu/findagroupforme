angular.module('app.user')
.directive('addressBook', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/user/views/addressbook/index.html'
	};
});