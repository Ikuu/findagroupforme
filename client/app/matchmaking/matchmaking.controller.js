(function() {
  'use strict';
  
  angular
    .module('app.matchmaking')
    .controller('MatchmakingController', MatchmakingController);

  function MatchmakingController(Title, Matchmaking) {
    var vm = this;
    vm.message = "Search for a group first!";
    vm.findMatchmakingGroup = findMatchmakingGroup;

    Title.set('Matchmaking');

    function findMatchmakingGroup(interest) {
      Matchmaking.searchForGroup({ interest: interest.toLowerCase() })
      .$promise.then(function(response) {
        if (response.message === "not enough matches to make group") {
        vm.message = response.message;
      }
      if (response.message === "temp group has been made, and messages sent.") {
        vm.message = "Group has been formed: " + response.group._id;
      }
    });
  }
}
})();