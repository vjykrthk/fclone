var fclone = angular.module('fclone');

fclone.controller('navbarController', ['$scope', '$location', '$auth',
	function ($scope, $location, $auth) {
		$scope.sign_out = function() {
			$auth.signOut().then(function(res) {
				$location.path('/');
			});
		}
	}
]);
