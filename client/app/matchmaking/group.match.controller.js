(function() {
  'use strict';

  angular
    .module('app.matchmaking')
    .controller('GroupMatchController', GroupMatchController);

  function GroupMatchController(Title, $routeParams, $http, $location) {
    var vm = this;
    vm.acceptedByDate;
    vm.acceptButton = acceptButton;
    vm.declineButton = declineButton;
    vm.tempGroup = [];
    
    Title.set('Matchmaking Group');
    retrieveMatchDetails();

    function acceptButton() {
      $http.post('/api/tempGroup/invite/accept/'+ $routeParams.id)
      .success(function(response) {
        if (response.message === "group formed") {
          $location.path('/groups/' + response.group._id);
        }
        if (response.error === "tempgroup not found") {
          $location.path('/404');
        }
        retrieveMatchDetails(); 
      });
    }
  
    function declineButton() {
      $http
        .post('/api/tempGroup/invite/decline/'+ $routeParams.id)
        .success(function(response) {
          if (response.error === "tempgroup not found") {
            return $location.path('/404');
          }       
          retrieveMatchDetails();
        });
    }

    function retrieveMatchDetails() {
      $http.get('/api/tempGroup/'+$routeParams.id)
      .success(function(response) {
        if (response.error) return $location.path('/404');

        vm.tempGroup = response;
        vm.acceptedByDate = new Date(response.date_created);
        vm.acceptedByDate.setDate(vm.acceptedByDate.getDate() + 7);
      });
    }
  }
})();