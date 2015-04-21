(function() {
  'use strict';

  angular
    .module('app.group')
    .controller('GroupController', GroupController);

  function GroupController($scope, $location, $routeParams, Group, Title) {
    var vm = this;

    vm.canEdit = false;
    vm.deleteButton = deleteButton;
    vm.editButton = editButton;
    vm.group = {};
    vm.groupMarker = {};
    vm.isMember = false;
    vm.joinButton = joinButton;
    vm.leaveButton = leaveButton;
    vm.map = {};
    vm.memberMarkerList = [];
    vm.private = false;

    loadGroupDetails();

    function loadGroupDetails() {
      Group.get({ _id: $routeParams.id }, function(response) {
        if (response.error) return $location.path('/404');
        var group = response.group;
        vm.group = group;
        vm.canEdit = response.owner;
        vm.isMember = response.member;
        Title.set(group.name);
  
        if (group.privateGroup) {
          vm.private = true; 
        }
        else {
          vm.map = {
            center:{
              latitude: group.location.coordinates[1],
              longitude: group.location.coordinates[0]
            },
            zoom: 12
          };
  
          vm.groupMarker = {
            id: 0,
            options: {
              title: group.name,
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            },
            coords: {
              latitude: group.location.coordinates[1],
              longitude: group.location.coordinates[0]
            }
          };
    
          vm.markerList = [];
    
          group.members.forEach(function(member) {
            vm.memberMarkerList.push({
              id: member._id,
              options: {
                title: member.name
              },
              coords: {
                latitude: member.home_location.coordinates[1],
                longitude: member.home_location.coordinates[0],
              }
            });
          });
        }
      });
    }

    function deleteButton() {
      Group.remove({ _id: $routeParams.id }).$promise.then(function(response) {
        alert("Group has been deleted!");
        $location.path('/');
      });
    }

    function editButton() {
      $location.path("/groups/"+$routeParams.id+"/edit");
    }

    function joinButton() {
      Group.addUser({_id: $routeParams.id}).$promise.then(function(response) {
        if (response.error) {
          alert("Already in this group!");
        }
        else {
          alert("You have joined the group!");
          loadGroupDetails();
        }
      });
    }

    function leaveButton() {
      Group.removeUser({_id: $routeParams.id}).$promise.then(function(response) {
        if (response.error) {
          alert("Not in group!");
        }
        else {
          alert("You have left the group!");
          $location.path("/");
        }
      });
    }

    // Move to directive
    $scope.addEventButton = function(event) {
      Group.addEvent({_id: $routeParams.id, events: event}).$promise.then(function(response) {
        loadGroupDetails();
      });
    };
  
    $scope.removeEventButton = function(event_id) {
      Group.removeEvent({_id: $routeParams.id, event_id: event_id}).$promise.then(function(response) {
        loadGroupDetails();
      });
    };
  }
})();