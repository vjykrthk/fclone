fclone.service('fcloneRegistrationService', ['$auth', 
	function($auth) {
		
		var registrationService = {};

		registrationService.register = function(user) {
			return $auth.submitRegistration(user);	
		}

		return registrationService;	
	}
]);