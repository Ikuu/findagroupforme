(function() {
  'use strict';

  angular.module('app.menubar')
    .directive('menubarLoggedIn', menubarLoggedIn)
    .directive('menubarLoggedOut', menubarLoggedOut);
  
  function menubarLoggedIn() {
    return {
      restrict: 'E',
      templateUrl: '/app/menubar/menubar-logged-in.html'
    };
  }

  function menubarLoggedOut() {
    return {
      restrict: 'E',
      templateUrl: '/app/menubar/menubar-logged-out.html'
    };
  }
})();