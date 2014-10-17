var fclone = angular.module('fclone');

fclone.service('fcloneFriendService', ['$auth', '$http', 
	function($auth, $http) {

		var baseUrl = $auth.apiUrl() + '/users/';
		
		var friendService = {};

		friendService.friends = [];
		friendService.friend_requests = [];
		friendService.user_profiles = [];

		friendService.get_friends = function(user_id) {
			return $http.get(baseUrl + user_id + '/friends').then(handleGetFriendsSuccess);
		}

		friendService.get_friend_requests = function(user_id) {
			return $http.get(baseUrl + user_id + '/requests').then(handleGetFriendRequestsSuccess);
		}

		friendService.get_user_profiles = function() {
			return $http.get(baseUrl).then(handleGetUserProfilesSuccess);
		}

		friendService.send_friend_request = function(id) {
			return $http.post($auth.apiUrl() + '/friendships/', { id : id });			
		}

		friendService.accept_friend_request = function(id) {
			console.log("id", id);
			return $http.put($auth.apiUrl() + '/friendships/'+id).then(handleAcceptFriendRequestSuccess);			
		}

		return friendService

		function handleGetFriendsSuccess(response) {
			return friendService.friends = response.data;
		}

		function handleGetFriendRequestsSuccess(response) {
			return friendService.friend_requests = response.data;
		}

		function handleAcceptFriendRequestSuccess(response) {
			return response.data;
		}

		function handleGetAllUserProfilesSuccuess(response) {
			return response.data;
		}

		function handleGetUserProfilesSuccess(response) {
			return friendService.user_profiles = response.data;
		}

		function handSendFriendRequestSuccess(response) {
			return response.data;
		}
			
	}
]);