angular.module('app.group')
.directive('detailsPublic', function() {
	// not used at the moment
	return {
		restrict: 'E',
		templateUrl: '/app/modules/group/views/details/public.html'
	};
})
.directive('detailsPrivate', function() {
	return {
		restrict: 'E',
		templateUrl: '/app/modules/group/views/details/private.html'
	};
});	