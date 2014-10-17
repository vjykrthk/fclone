var fclone = angular.module('fclone');

fclone.controller('friendsController',['$scope', 'fcloneFriendService', 
	function($scope, fcloneFriendService) {
		fcloneFriendService.get_friends($scope.user.id).then(function() {
				$scope.friends = fcloneFriendService.friends;
		});
	}	
]);