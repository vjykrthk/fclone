var fclone = angular.module('fclone');

fclone.controller('userProfileController',['$scope', '$location', 
	function($scope, $location) {			
		if(!$scope.user.signedIn) {
			$location.path('/');	
		}	
	}
]);