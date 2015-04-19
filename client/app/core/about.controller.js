(function() {
  'use strict';
  
  angular
    .module('app.core')
    .controller('AboutController', AboutController);  

  function AboutController(Title) {
    Title.set('About');
  }
})();