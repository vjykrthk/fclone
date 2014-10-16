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

fclone.controller('registrationController',['$scope', 'fcloneRegistrationService', 
	function($scope, fcloneRegistrationService) {		
		$scope.handleRegistrationbtnclick = function() {
			fcloneRegistrationService.register($scope.registrationForm).then(function() {
				$scope.confirmation_email_send = true;
				$scope.registrationForm = {}
			});			
		}
	}
]);

fclone.controller('userProfileController',['$scope', '$location', '$routeParams', 
	'fcloneFriendService', 'fclonePostService',
	function($scope, $location, $routeParams, fcloneFriendService, fclonePostService) {		
		/* neccessary to use if else  by just using if http calls are till made*/
		if(!$scope.user.signedIn) {
			$location.path('/');	
		} else {
			fcloneFriendService.get_friends($scope.user.id).then(function(friends) {
				$scope.friends = friends.data;
			});

			fcloneFriendService.get_friend_requests($scope.user.id).then(function(friend_requests) {
				$scope.friend_requests =  friend_requests.data;
			});

			$scope.accept_request = function(friend_request) {
				fcloneFriendService.accept_friend_request(friend_request.id).then(function(friend) {
					$scope.friends.push(friend);
				});				
			}
						
			$scope.sendPost = function() {				
				fclonePostService.sendPost($scope.post_content).then(function(post) {
					post = post.data;
					post.user = $scope.user;
					$scope.posts.push(post); 
				});	
			}

			fclonePostService.getPosts($routeParams['id']).then(function(posts) {
				$scope.posts = posts.data;
			});			
		}		
	}
]);

fclone.controller('findFriendsController',['$scope', '$location', 'fcloneFriendService',
	function($scope, $location, fcloneFriendService) {		
		if(!$scope.user.signedIn) {
			$location.path('/');	
		} else {
			fcloneFriendService.get_all_user_profiles().then(function(user_profiles){
				$scope.user_profiles = user_profiles.data;
			});

			$scope.send_request = function(user_profile) {
				console.log("user_profile", user_profile);
				fcloneFriendService.send_friend_request(user_profile.id).then(function(user_profile) {
					var user_profile = user_profile.data					
					var index = _.findKey($scope.user_profiles, { 'id': user_profile.id });					
					$scope.user_profiles.splice(index, 1);
				});
			}
		}
	}
]);


fclone.controller('navbarController', ['$scope', '$location', 
	function ($scope, $location) {}
]);


fclone.service('fcloneFriendService', ['$auth', '$http', 
	function($auth, $http) {

		var baseUrl = $auth.apiUrl() + '/users/';
		
		var friendService = {};

		friendService.get_friends = function(user_id) {
			return $http.get(baseUrl + user_id + '/friends');
		}

		friendService.get_friend_requests = function(user_id) {
			return $http.get(baseUrl + user_id + '/requests');
		}

		friendService.get_all_user_profiles = function() {
			return $http.get(baseUrl);
		}

		friendService.send_friend_request = function(id) {
			return $http.post($auth.apiUrl() + '/friendships/', { id : id });			
		}

		friendService.accept_friend_request = function(id) {
			console.log("id", id);
			return $http.put($auth.apiUrl() + '/friendships/'+id);			
		}

		return friendService
			
	}
]);

fclone.service('fcloneRegistrationService', ['$auth', 
	function($auth) {
		
		var registrationService = {};

		registrationService.register = function(user) {
			return $auth.submitRegistration(user);	
		}

		return registrationService;	
	}
]);

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

fclone.service('fcloneFriendshipService', ['$auth', '$resource', 
	function($auth, $resource) {
		$resource($auth.apiUrl() + '/friendships/:id', {id:"@id"}, { update : { method : "PUT" }});
	}
]);



