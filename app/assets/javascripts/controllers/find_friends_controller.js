var fclone = angular.module('fclone');

fclone.controller('findFriendsController',['$scope', '$location', 'fcloneFriendService',
	function($scope, $location, fcloneFriendService) {		
		if(!$scope.user.signedIn) {
			$location.path('/');	
		} else {
			fcloneFriendService.get_all_user_profiles().then(function(user_profiles){
				$scope.user_profiles = user_profiles.data;
			});

			$scope.send_request = function(user_profile) {
				fcloneFriendService.send_friend_request(user_profile.id).then(function(user_profile) {
					var user_profile = user_profile.data					
					var index = _.findKey($scope.user_profiles, { 'id': user_profile.id });					
					$scope.user_profiles.splice(index, 1);
				});
			}
		}
	}
]);