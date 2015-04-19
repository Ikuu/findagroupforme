(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('UserFactory', factory);

  function factory($http) {
    return {
      getUser: getUser
    };

    function getUser() {
      return $http.get('/session');
    }
  }
})();