(function() {
  'use strict';
  
  angular
    .module('app.matchmaking')
    .controller('MatchmakingController', MatchmakingController);

  function MatchmakingController(Title, Matchmaking) {
    var vm = this;

    vm.message = "Search for a group first!";
    vm.findMatchmakingGroup = findMatchmakingGroup;
    vm.groupFound = false;
    vm.groupId = '';
    vm.interest = '';

    Title.set('Matchmaking');

    function findMatchmakingGroup(interest) {
      Matchmaking.searchForGroup({ interest: vm.interest.toLowerCase() })
      .$promise.then(function(response) {
        if (response.message === "not enough matches to make group") {
        vm.message = "Not enough matches to make a group. You will be sent a message if a match is found.";
        vm.groupFound = false;
        vm.interest = '';
      }
      if (response.message === "temp group has been made, and messages sent.") {
        vm.groupId = response.group._id;
        vm.groupFound = true;
      }
    });
  }
}
})();