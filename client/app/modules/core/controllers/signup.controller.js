angular.module('app.core')
.controller('SignupController', function($scope, Title, User) {
	Title.set('Sign Up');

	$scope.createUser = function() {
		User.save($scope.user).$promise.then(function(response) {
			console.log(response);
			alert("Signed up!");
		});
	};
});