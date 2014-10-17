var fclone = angular.module('fclone');
fclone.service('fclonePostService', ['$auth', '$http', 
	function($auth, $http) {
		var postService = {};

		postService.posts = [];
		
		postService.sendPost = function(post_content) {
			var params =  { post: { content: post_content } };
			return $http.post($auth.apiUrl() + '/posts', params)
				   .then(handleSendPostSuccess); 
		}

		postService.getPosts = function(user_id) {
			 return $http.get($auth.apiUrl() + '/' + user_id +'/posts')
			       .then(handleGetPostSuccess);
		}

		return postService;		
		
		function handleSendPostSuccess(response) {
			return response.data;	
		}

		function handleGetPostSuccess(response) {
			return postService.posts = response.data;
		}
	}
]);