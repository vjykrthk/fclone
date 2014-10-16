var fclone = angular.module('fclone');

fclone.controller('userProfileController',['$scope', '$location', '$routeParams', 
	'fcloneFriendService', 'fclonePostService',
	function($scope, $location, $routeParams, fcloneFriendService, fclonePostService) {		
		/* neccessary to use if else  by just using if http calls are till made*/
		if(!$scope.user.signedIn) {
			$location.path('/');	
		} else {
			fcloneFriendService.get_friends($scope.user.id).then(function(friends) {
				$scope.friends = friends.data;
			});

			fcloneFriendService.get_friend_requests($scope.user.id).then(function(friend_requests) {
				$scope.friend_requests =  friend_requests.data;
			});

			$scope.accept_request = function(friend_request) {
				fcloneFriendService.accept_friend_request(friend_request.id).then(function(friend) {
					var friend = friend.data
					$scope.friends.push(friend);
					var index = _.findKey($scope.friend_requests, { 'id': friend.id });
					$scope.friend_requests.splice(index, 1);
				});				
			}
						
			$scope.sendPost = function() {				
				fclonePostService.sendPost($scope.post_content).then(function(post) {
					post = post.data;
					post.user = $scope.user;
					$scope.posts.push(post); 
				});	
			}

			fclonePostService.getPosts($routeParams['id']).then(function(posts) {
				$scope.posts = posts.data;
			});			
		}		
	}
]);