(function() {
  'use strict';

  angular
    .module('app.home')
    .directive('homepageLoggedIn', homepageLoggedIn)
    .directive('homepageLoggedOut', homepageLoggedOut);

  function homepageLoggedIn() {
    return {
      restrict: 'E',
      templateUrl: '/app/home/homepage-logged-in.html'
    };
  }

  function homepageLoggedOut() {
    return {
      restrict: 'E',
      templateUrl: '/app/home/homepage-logged-out.html'
    };
  }
})();