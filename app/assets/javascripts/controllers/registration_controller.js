var fclone = angular.module('fclone');


/* image upload is take care ng-form-data module */
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