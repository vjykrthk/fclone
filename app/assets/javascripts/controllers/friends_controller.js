var fclone = angular.module('fclone');

fclone.controller('friendsController',['$scope', 'fcloneFriendService', 
	function($scope, fcloneFriendService) {
		fcloneFriendService.get_friends($scope.user.id).then(function(friends) {
				$scope.friends = friends.data;
		});
	}	
]);