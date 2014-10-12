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
	    tokenValidationPath:     '/user/validate_token'
	});

	
});





fclone.controller('indexController',['$scope', function($scope) {



}]);

fclone.controller('registrationController',['$scope', '$auth', function($scope, $auth) {
	$scope.handleRegistrationbtnclick = function() {
		console.log('registration ', $scope.registrationForm);
		$scope.registrationForm = {
			profile_name : 'vijay',
			email : 'vjykrt.h@gmail.com',
			password : '12345678',
			password_confirmation : '12345678',
		};
		$auth.submitRegistration($scope.registrationForm)
		.then(function(resp) {
			console.log("success ", resp);
		})
		.catch(function(resp) { 
          console.log("errors ", resp);
        });;
	}

	$scope.$on('auth:registration-email-error', function(ev, data) {
		console.log("registration errors : ", data); 
	});

}]);

fclone.controller('userProfileController',['$scope', '$routeParams', function($scope, $routeParams) {



}]);

fclone.controller('findFriendsController',['$scope', function($scope) {



}]);


fclone.controller('navbarController', ['$scope', '$location', function ($scope, $location) {
    $scope.name = "vijay karthik";
 }]);



