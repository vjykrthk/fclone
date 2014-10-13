class RegistrationsController < DeviseTokenAuth::RegistrationsController
	def sign_up_params
		puts " params #{params.inspect}"
		params.require(:users).permit(:profile_name, :email, :password, :password_confirmation, :image)
	end
 
	def account_update_params
		params.require(:users).permit(:profile_name, :email, :password, :password_confirmation, :image)
	end

end