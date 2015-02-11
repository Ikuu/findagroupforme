angular.module('app.user')
.directive('profilePublic', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/user/views/profile/public.html'
	};
})
.directive('profilePrivate', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/user/views/profile/private.html'
	};
});	