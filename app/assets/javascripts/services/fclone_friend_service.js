var fclone = angular.module('fclone');

fclone.service('fcloneFriendService', ['$auth', '$http', 
	function($auth, $http) {

		var baseUrl = $auth.apiUrl() + '/users/';
		
		var friendService = {};

		friendService.get_friends = function(user_id) {
			return $http.get(baseUrl + user_id + '/friends');
		}

		friendService.get_friend_requests = function(user_id) {
			return $http.get(baseUrl + user_id + '/requests');
		}

		friendService.get_all_user_profiles = function() {
			return $http.get(baseUrl);
		}

		friendService.send_friend_request = function(id) {
			return $http.post($auth.apiUrl() + '/friendships/', { id : id });			
		}

		friendService.accept_friend_request = function(id) {
			console.log("id", id);
			return $http.put($auth.apiUrl() + '/friendships/'+id);			
		}

		return friendService
			
	}
]);