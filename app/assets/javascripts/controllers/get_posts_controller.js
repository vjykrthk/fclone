var fclone = angular.module('fclone');

fclone.controller('getPostsController',['$scope', 'fclonePostService', 
	function($scope, fclonePostService) {
		
		fclonePostService.getPosts($scope.user.id).then(function() {
			$scope.posts = fclonePostService.posts;
		});
	}
]);