(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('SettingsController', SettingsController);

  function SettingsController($routeParams, User, $location, Title, Matchmaking, $http) {
    var vm = this;
    vm.addressNotVerified = true;
    vm.map = {};
    vm.match = [];
    vm.user = {};
    vm.userMarker = {};

    vm.deleteMatch = deleteMatch;

    vm.addRecommendedInterest = addRecommendedInterest;
    vm.addInterest = addInterest;
    vm.removeInterest = removeInterest;
    vm.recommenededInterests = [];

    vm.changePassword = changePassword;
    vm.currentPassword = '';
    vm.newPassword = '';

    Title.set('Settings');
    getUserDetails();

    // Move to a function
    Matchmaking.findCurrentSearches({}, function(data) {
      vm.match = data;
    });

    $http.get('/api/users/interest/find').success(function(response) {
      vm.recommenededInterests = response;
    });

    function getUserDetails() {
      User.getSignedInUser({}, function(user) {
        vm.user = user;

        vm.map = {
          center: vm.user.home_location.coordinates,
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
              vm.user.home_location.coordinates = [marker.getPosition().lng(), marker.getPosition().lat()];
            }
          },
          coords: vm.user.home_location.coordinates
        };
      }); 
    }

    function editUser() {
      User.update({
        _id: vm.user._id,
        name: vm.user.name,
        email: vm.user.email,
        private: vm.user.private,
        home_location: vm.user.home_location
      }).$promise.then(function(response) {
        if (response.message === "User has been updated") {
          alert("Profile Updated!");
          getUserDetails();
        }
      });
    }

    function addRecommendedInterest(interest) {
      User.addInterest({ interest: interest }).$promise.then(function(response) {
        getUserDetails();
        $http.get('/api/users/interest/find').success(function(response) {
          vm.recommenededInterests = response;
        });
      });
    }

    function addInterest() {
      var interest = prompt("Please enter the interest:");
      if (interest !== null) {
        User.addInterest({ interest: interest }).$promise.then(function(response) {
          getUserDetails();
  
          $http.get('/api/users/interest/find').success(function(response) {
            vm.recommenededInterests = response;
          });
        });
      }     
    }

    function removeInterest(interest) {
      User.removeInterest({ interest: interest }).$promise.then(function(response) {
        getUserDetails();

        $http.get('/api/users/interest/find').success(function(response) {
          vm.recommenededInterests = response;
        });
      });
    }

    function changePassword() {
      User.changePassword({
        currentPassword: vm.currentPassword,
        newPassword: vm.newPassword
      }).$promise.then(function(response) {
        if (response.error) {
          alert(response.error);
        }
        else {
          alert('Password changed!');
          vm.currentPassword = '';
          vm.newPassword = '';
        }
      });      
    }

    function deleteMatch(id) {
      Matchmaking.deleteMatch({ _id: id }).$promise.then(function(response) {
        Matchmaking.findCurrentSearches({}, function(data) {
          vm.match = data;
        });
      });
    }
  }
})();