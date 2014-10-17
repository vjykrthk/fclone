fclone.service('fcloneRegistrationService', ['$auth', 
	function($auth) {
		
		var registrationService = {};

		registrationService.register = function(user) {

			return $auth.submitRegistration(user)
					.then(handleRegistrationSuccess)
					.catch(handleRegistrationFailure);	
		}

		return registrationService;

		function handleRegistrationSuccess(res) {
			console.log("handleRegistrationSuccess ", res);
		}

		function handleRegistrationFailure(res) {
			console.log("handleRegistrationFailure ", res);
		}
	}
]);