(function() {
  'use strict';

  angular
    .module('app.whatson')
    .controller('WhatsOnController', WhatsOnController);

  function WhatsOnController(Title, $http) {
    var vm = this;

    vm.currentLocationEvents = currentLocationEvents;
    vm.eventMarkerList = [];
    vm.map = {};
    vm.noEvents = true;
    vm.resetLocation = resetLocation;
    vm.results;
    
    var user_location = []; 
    
    Title.set("What's On!");
    getMapDetails();
  
    function getMapDetails(location) {
      $http.get('./api/groups/public/events',{ params: { user_location: location } }).success(function(response) {
        loadMapDetails(response);
        response.message ? vm.noEvents = true : vm.noEvents = false;
      });   
    }
  
    function loadMapDetails(mapData) {
      vm.results = mapData.results;
      vm.eventMarkerList = [];
  
      vm.map = {
        center: mapData.user.coordinates,
        zoom: 12
      };
  
      vm.userMarker = {
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
            vm.map.center.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
            vm.userMarker.coords = [marker.getPosition().lng(), marker.getPosition().lat()];
            
            getMapDetails(vm.map.center.coordinates);
          }
        },
        coords: mapData.user
      };
  
      if (mapData.results) {
        _.each(mapData.results, function(result) {
          vm.eventMarkerList.push({
            id: result.obj.events[0]._id,
            options: {
              title: result.obj.events[0].name + ' @ ' + result.obj.events[0].date
            },
            coords: result.obj.location.coordinates
          });
        });
      }
    }
  
    function currentLocationEvents() {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
  
      function success(pos) {
        var crd = pos.coords;
        user_location = [crd.longitude, crd.latitude];
        getMapDetails(user_location);
      }
  
      function error(err) {
      }
  
      navigator.geolocation.getCurrentPosition(success, error, options);  
    }

    function resetLocation() {
      getMapDetails();
    }
  }
})();