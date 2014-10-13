class ApplicationController < ActionController::Base
	include DeviseTokenAuth::Concerns::SetUserByToken
    # Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	protect_from_forgery with: :null_session
		
	respond_to :json

	before_action :update_sanitized_params, if: :devise_controller?

	def update_sanitized_params		
	  devise_parameter_sanitizer.for(:sign_up).push :image, :profile_name
	  devise_parameter_sanitizer.for(:account_update).push :image, :profile_name
	end
end
