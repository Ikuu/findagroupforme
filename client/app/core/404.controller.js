(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('404Controller', Controller404);

  function Controller404(Title) {
    Title.set('404 Error');
  }
})();