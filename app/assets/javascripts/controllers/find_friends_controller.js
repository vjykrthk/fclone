var fclone = angular.module('fclone');

fclone.controller('findFriendsController',['$scope', '$location', 'fcloneFriendService',
	function($scope, $location, fcloneFriendService) {		
		if(!$scope.user.signedIn) {
			$location.path('/');	
		} else {
			fcloneFriendService.get_user_profiles().then(function(user_profiles){
				$scope.user_profiles = fcloneFriendService.user_profiles;
			});

			$scope.send_request = function(user_profile) {
				fcloneFriendService.send_friend_request(user_profile.id).then(function(user_profile) {										
					var index = _.findKey(fcloneFriendService.user_profiles, { 'id': user_profile.id });					
					fcloneFriendService.user_profiles.splice(index, 1);
				});
			}
		}
	}
]);