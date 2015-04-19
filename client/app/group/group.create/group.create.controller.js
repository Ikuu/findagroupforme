(function() {
  'use strict';
  angular
    .module('app.group')
    .controller('GroupCreateController', GroupCreateController);

  function GroupCreateController(Title, $location, Group) {
    var vm = this;
    vm.createGroup = createGroup;
    vm.group_location = {
      type: 'Point',
      coordinates: [-4.262475, 55.861754]
    };
    vm.groupMarker = {
      id: 0,
      options: {
        title: "You!",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        },
        draggable: true
      },
      events: {
        dragend: function(marker, eventName, args) {
          vm.group_location.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
        }
      },
      coords: vm.group_location.coordinates
    };
    vm.map = {
      center: vm.group_location.coordinates,
      zoom: 12
    }; 
    
    Title.set('Create Group');
  
    function createGroup() {
      Group.save({
        name: vm.name,
        interest: vm.interest,
        private: vm.private,
        description: vm.description,
        location: vm.group_location
      }).$promise.then(function(response) {
        alert("Group has been added!");
        $location.path('/groups/' + response._id);
      });
    }
  }
})();