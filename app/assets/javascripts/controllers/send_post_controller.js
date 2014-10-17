var fclone = angular.module('fclone');

fclone.controller('sendPostController', ['$scope', 'fclonePostService', 
	function($scope, fclonePostService) {
		$scope.sendPost = function() {				
			fclonePostService.sendPost($scope.post_content).then(function(post) {
				post = post.data;
				post.user = $scope.user;
				$scope.posts.push(post); 
			});	
		}
	}
]);