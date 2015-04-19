(function() {
  'use strict';

  angular
    .module('app.group')
    .directive('eventDetails', eventDetails)
    .directive('eventCreate', eventCreate);

  function eventDetails() {
    return {
      restrict: 'E',
      templateUrl: 'app/group/event-details.html'
    };
  }

  function eventCreate() {
    return {
      restrict: 'E',
      templateUrl: 'app/group/event-create.html'
    };
  }
})();