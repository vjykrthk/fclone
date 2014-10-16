var fclone = angular.module('fclone', ['templates', 'ngRoute', 'ng-token-auth', 'ng-form-data', 'ui.bootstrap']);


fclone.config(function($routeProvider, $locationProvider, $authProvider) {
	$locationProvider.html5Mode({ enabled: true, requireBase: false });

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