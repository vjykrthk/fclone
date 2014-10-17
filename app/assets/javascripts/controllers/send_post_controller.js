var fclone = angular.module('fclone');

fclone.controller('sendPostController', ['$scope', 'fclonePostService', 
	function($scope, fclonePostService) {
		$scope.sendPost = function() {				
			fclonePostService.sendPost($scope.post_content).then(function(post) {				
				post.user = $scope.user;
				fclonePostService.posts.push(post); 
			});	
		}
	}
]);