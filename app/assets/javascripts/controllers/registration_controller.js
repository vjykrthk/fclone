var fclone = angular.module('fclone');


/* image upload is take care ng-form-data module */
fclone.controller('registrationController',['$scope', '$modal', 'fcloneRegistrationService', 
	function($scope, $modal, fcloneRegistrationService) {		
		$scope.errors = false;
		$scope.handleRegistrationbtnclick = function() {
			fcloneRegistrationService.register($scope.registrationForm);			
		}


		$scope.$on('auth:registration-email-success', function(ev, message) {
    		$scope.confirmation_email_send = true;
			$scope.registrationForm = {}
		});

		$scope.$on('auth:registration-email-error', function(ev, data) {					
			$scope.errors = true;

			$scope.registration_errors = _(data.errors)
					.map(
						function(v, k) {
					 		return k + ": " + v + ".";
						}
					)
					.value()
					.join("<br/>");
		});

	}
]);