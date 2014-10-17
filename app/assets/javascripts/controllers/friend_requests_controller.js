var fclone = angular.module('fclone');


fclone.controller('friendRequestsController', ['$scope', 'fcloneFriendService', 
	function($scope, fcloneFriendService) {
		$scope.testing = "testing";
		fcloneFriendService.get_friend_requests($scope.user.id).then(function(friend_requests) {
				$scope.friend_requests =  friend_requests.data;
		});

		$scope.accept_request = function(friend_request) {
			fcloneFriendService.accept_friend_request(friend_request.id).then(function(friend) {
				var friend = friend.data
				// $scope.friends.push(friend);
				var index = _.findKey($scope.friend_requests, { 'id': friend.id });
				$scope.friend_requests.splice(index, 1);
			});				
		}	
	}
]);