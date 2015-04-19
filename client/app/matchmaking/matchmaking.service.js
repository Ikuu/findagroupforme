(function() {
  'use strict';

  angular
    .module('app.matchmaking')
    .factory('Matchmaking', matchmaking);

  function matchmaking($resource) {
    return $resource('/api/match/:_id', {}, {
      searchForGroup: {
        method: 'POST'
      },
      deleteMatch: {
        method: 'DELETE',
        url: '/api/match/remove/:_id',
        params: { _id: '@_id' }
      },
      findCurrentSearches: {
        method: 'GET',
        isArray: true,
        url: '/api/match/user'
      }
    }); 
  }
})();