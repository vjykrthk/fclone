var fclone = angular.module('fclone');


fclone.controller('friendRequestsController', ['$scope', 'fcloneFriendService', 
	function($scope, fcloneFriendService) {
		$scope.testing = "testing";
		fcloneFriendService.get_friend_requests($scope.user.id).then(function(friend_requests) {
				$scope.friend_requests =  fcloneFriendService.friend_requests;
		});

		$scope.accept_request = function(friend_request) {
			fcloneFriendService.accept_friend_request(friend_request.id).then(function(friend) {				
				fcloneFriendService.friends.push(friend);
				var index = _.findKey(fcloneFriendService.friend_requests, { 'id': friend.id });
				fcloneFriendService.friend_requests.splice(index, 1);
			});				
		}	
	}
]);