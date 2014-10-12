var fclone = angular.module('fclone', ['templates', 'ngRoute', 'ng-token-auth']);


fclone.config(function($routeProvider, $locationProvider, $authProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
	.when('/', {
		templateUrl: 'index.html', 
		controller: 'indexController'
	})
	.when('/signup', {
		templateUrl: 'registration.html',
		controller:'registrationController'
	})
	.when('/find_friends', {
		templateUrl: 'find_friends.html',
		controller: 'findFriendsController'		
	})
	.when('/user_profile/:id', {
		templateUrl: 'user_profile.html',
		controller: 'userProfileController'
	});

	

	$authProvider.configure({
	    apiUrl:                	 'http://localhost:3000',        
	    signOutUrl:              '/user/sign_out',
	    emailSignInPath:         '/user/sign_in',
	    emailRegistrationPath:   '/user',
	    accountUpdatePath:       '/user',
	    accountDeletePath:       '/user',
	    passwordResetPath:       '/user/password',
	    passwordUpdatePath:      '/user/password',
	    tokenValidationPath:     '/user/validate_token',
	    confirmationSuccessUrl: function() {
        	return 'http://localhost:3000';
      	}
	});	
});





fclone.controller('indexController',['$scope', '$location', '$auth', '$window', '$rootScope', function($scope, $location, $auth, $window, $rootScope) {

	console.log('indexController :', $rootScope.user);
	
	$scope.handleSignInBtnClick = function() {
		console.log("login form : ", $scope.loginForm);

		$auth.submitLogin($scope.loginForm)
		.then(function(user) {
			console.log("user :", user);
			$rootScope.logged_in_user = user;
			$location.path('/user_profile/' + user.id);
		})	
		.catch(function(res) {

		});
	}

	$scope.$on('auth:validation-success', function(ev, user) {
		console.log("auth:validation-success : ", user);
		$rootScope.logged_in_user = user;		
    	$location.path('/user_profile/' + user.id);
	});

	$scope.$on('auth:email-confirmation-success', function(ev, user) {
    	console.log("auth:email-confirmation-success : ", user);
    	$rootScope.logged_in_user = user;
    	$location.path('/user_profile/' + user.id);    	
	});

}]);

fclone.controller('registrationController',['$scope', '$auth', function($scope, $auth) {
	$scope.registrationForm = {}
	$scope.handleRegistrationbtnclick = function() {
		console.log('registration ', $scope.registrationForm);
		$auth.submitRegistration($scope.registrationForm)
		.then(function(resp) {
			$scope.confirmation_email_send = true;
		})
		.catch(function(resp) { 
          console.log("errors ", resp);
        });		
	}
}]);

fclone.controller('userProfileController',['$scope', '$routeParams', '$rootScope', '$location', function($scope, $routeParams, $rootScope, $location) {

	if(!$rootScope.user.signedIn) {
		$location.path('/');	
	}
	
	console.log('userProfileController', $rootScope.user);
	
	$scope.$on('auth:validation-success', function(ev, user) {
		console.log('auth:validation-success', $rootScope.user);
		$rootScope.logged_in_user = user;
		$scope.user_id = user.id;
	});
		
}]);

fclone.controller('findFriendsController',['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {

	if(!$rootScope.user.signedIn) {
		$location.path('/');	
	}

	console.log('findFriendsController', $rootScope.user);
	$http.get('/list_of_users/' + $rootScope.user.id)
	.success(function(res) {
		console.log('findFriendsController :', res);
	})
	.error(function(res) {

	});
}]);


fclone.controller('navbarController', ['$scope', '$location', function ($scope, $location) {
    $scope.name = "vijay karthik";
}]);



