var fclone = angular.module('fclone');
fclone.controller('indexController',['$scope', '$location', '$auth', 
	function($scope, $location, $auth) {

		console.log('indexController :', $scope.user);
		
		$scope.handleSignInBtnClick = function() {
			console.log("login form : ", $scope.loginForm);

			$auth.submitLogin($scope.loginForm)
			.then(function(user) {
				console.log("user :", user);			
				$location.path('/user_profile/' + user.id);
			})	
			.catch(function(res) {

			});
		}

		$scope.$on('auth:validation-success', function(ev, user) {
			console.log("auth:validation-success : ", user);				
	    	$location.path('/user_profile/' + user.id);
		});

		$scope.$on('auth:email-confirmation-success', function(ev, user) {
	    	console.log("auth:email-confirmation-success : ", user);    	
	    	$location.path('/user_profile/' + user.id);    	
		});

	}
]);