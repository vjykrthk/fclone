var fclone = angular.module('fclone');
fclone.service('fclonePostService', ['$auth', '$http', 
	function($auth, $http) {
		var postService = {};
		
		postService.sendPost = function(post_content) {
			return $http.post($auth.apiUrl() + '/posts', { post: { content: post_content } })
		}

		postService.getPosts = function(user_id) {
			 return $http.get($auth.apiUrl() + '/' + user_id +'/posts')
		}

		return postService;		
	}
]);