angular.module('app.group')
.directive('eventDetails', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/modules/group/views/event/details.html'
	}
})
.directive('eventCreate', function() {
	return {
		restrict: 'E',
		templateUrl: 'app/modules/group/views/event/create.html'
	};
});