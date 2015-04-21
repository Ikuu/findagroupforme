(function() {
  angular
    .module('app.core')
    .controller('GroupsController', GroupsController);

  function GroupsController(User, Group, Title, $location) {
    var vm = this;
    vm.groups = [];
    vm.groupMarkerList = [];
    vm.user = {};

    Title.set('Groups');
    loadDetails();

    function loadDetails() {
      Group.query({} , function(group) {
        vm.groups = group;
      });

      User.getSignedInUser({}, function(user) {
        vm.user = user;
        renderMap();
      }); 
    }

    function renderMap() {
      vm.map = {
        center: vm.user.home_location.coordinates,
        zoom: 10
      };

      vm.userMarker = {
        id: 0,
        options: {
          title: "You!",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        },
        coords: vm.user.home_location.coordinates
      };

      vm.groups.forEach(function(group) {
        vm.groupMarkerList.push({
          id: group._id,
          options: {
            title: group.name,
            link: function() {
              $location.path('/groups/' + group._id);
            }
          },
          coords: {
            latitude: group.location.coordinates[1],
            longitude: group.location.coordinates[0],
          }
        });
      });
    }
  }
})();