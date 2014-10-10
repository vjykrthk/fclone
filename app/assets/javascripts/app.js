var fclone = angular.module('fclone', ['templates', 'ngRoute']);



fclone.config(function($routeProvider, $locationProvider) {
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

	$locationProvider.html5Mode(true);
});


fclone.controller('indexController',['$scope', function($scope) {



}]);

fclone.controller('registrationController',['$scope', function($scope) {



}]);

fclone.controller('registrationController',['$scope', function($scope) {



}]);

fclone.controller('userProfileController',['$scope', '$routeParams', function($scope, $routeParams) {



}]);

fclone.controller('findFriendsController',['$scope', function($scope) {



}]);


fclone.controller('navbarController', ['$scope', '$location', function ($scope, $location) {
    $scope.name = "vijay karthik";
 }]);



