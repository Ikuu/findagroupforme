'use strict';

describe('Core.UsersController', function() {
	var $scope, user;

	var returnedUsers = [
	{
    	"_id": "5473777e753bbfdc8b654470",
    	"email": "revolution6000@gmail.com",
    	"password": "1",
    	"username": "Ikuu",
    	"name": "Alexander Anderson",
    	"__v": 19,
    	"groups": [
      	{
      	  "_id": "547499888a46603c041a6b66",
      	  "interest": "snowboarding",
      	  "name": "Glasgow Snowboard Club"
      	}
    	],	
    	"current_location": [
    	  55.896154,
    	  -4.427094
    	],
    	"home_location": [
    	  null,
    	  null
    	],
    	"twitter": {
    	  "photos": []
    	},
    	"interests": [],
    	"date_registered": "2014-11-24T18:22:54.062Z"
    },
  	{
  		"_id": "547b6252ee09fef8405d1834",
  		"email": "revolution6000@gmail.com",
  		"password": "1",
  		"username": "Ikuu00",
  		"name": "Alex",
  		"__v": 1,
  		"groups": [
  		  {
  		    "_id": "5473782d753bbfdc8b654471",
  		    "interest": "golf",
  		    "name": "Erskine Golf Club"
  		  }
  		],
  		"current_location": [],
  		"home_location": [],
  		"twitter": {
  		  "photos": []
  		},
  		"interests": [],
  		"date_registered": "2014-11-30T18:30:42.292Z",
  		"address": {
  		  "country": "United Kingdom",
  		  "post_code": "PA8 7DF",
  		  "city": "Erskine",
  		  "street": "151 Flures Drive"
  		}
  	}]

	beforeEach(module('app.core'));

	beforeEach(inject(function($rootScope, $controller) {
		user = {
			query: function(){}
		};

		spyOn(user, 'query').and.returnValue(returnedUsers);
		$scope = $rootScope.$new();
		$controller('UsersController', {$scope: $scope, User: user});
	}));

	it('$scope.users[0].name should be Alexander Anderson', function() {
		expect($scope.users[0].name).toBe("Alexander Anderson");
	});

	it("$scope.users[1].address.city should be Erskine", function() {
		expect($scope.users[1].address.city).toBe("Erskine");
	});

	it("$scope.users[2] should not exist", function() {
		expect($scope.users[2]).toBe(undefined);
	});
});