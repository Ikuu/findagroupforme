'use strict';

describe('Core.GroupsController', function() {
	var $scope, group;

	var returnedUsers = [{  
		_id:"547499888a46603c041a6b66",
		description:"This is a group for Snowboarding!",
		interest:"snowboarding",
		name:"Glasgow Snowboard Club",
		__v:0,
		events:[  

		],
		posts:[  

		],
		members:[  
			{  
				_id:"5473777e753bbfdc8b654470",
				name:"Alexander Anderson",
				current_location:[  
					55.896154,
					-4.427094
				]
			}
		],
		location: {
			type:'Point',
			coordinates:[ 55.879622, -4.371489]
		},
		date_created:"2014-11-25T15:00:24.855Z"
	},
	{  
		_id:"5473782d753bbfdc8b654471",
		interest:"golf",
		name:"Erskine Golf Club",
		__v:18,
		description:"Test.",
		events:[  

		],
		posts:[  

		],
		members:[  
			{  
				_id:"547b6252ee09fef8405d1834",
				name:"Alex",
				current_location:[  

				]
			}
		],
		location: {
			type:'Point',
			coordinates:[ 55.916752, -4.504116]
		},
		date_created:"2014-11-24T18:25:49.748Z"
	}]

	beforeEach(module('app.core'));

	beforeEach(inject(function($rootScope, $controller) {
		group = {
			query: function(){}
		};

		spyOn(group, 'query').and.returnValue(returnedUsers);
		$scope = $rootScope.$new();
		$controller('GroupsController', {$scope: $scope, Group: group});
	}));

	it('$scope.groups[0].interest should be Alexander Anderson', function() {
		expect($scope.groups[0].interest).toBe("snowboarding");
	});

	it("$scope.groups[1].members[0].name should be Alex", function() {
		expect($scope.groups[1].members[0].name).toBe("Alex");
	});

	it("$scope.groups[2] should not exist", function() {
		expect($scope.groups[2]).toBe(undefined);
	});
});