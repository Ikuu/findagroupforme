(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  function HomeController(Title, UserFactory, $location) {
    var vm = this;

    vm.groupMarkerList = [];
    vm.hasEventsToday = false;
    vm.loggedIn = false;
    vm.map = {};
    vm.todaysEvents = [];
    vm.user = {};
    vm.userMarker = {};

    Title.set('Home');
    loadUserDetails();

    function loadUserDetails() {
      UserFactory.getUser().then(function success(response) {
        if (response.status === 204) return;
        vm.user = response.data;
        vm.loggedIn = true;
        renderMap();
      });
    }

    function renderMap() {
      vm.map = {
        center: vm.user.home_location.coordinates,
        zoom: 11
      };

      vm.userMarker = {
        id: 0,
        options: {
          title: "You!",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          },
          link: function() {
            $location.path('/user/' + vm.user._id);
          }
        },
        coords: vm.user.home_location.coordinates
      };

      vm.user.groups.forEach(function(group) {
        if (group.events.length > 0) vm.hasEventsToday = true;
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