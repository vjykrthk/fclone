class FriendshipsController < ApplicationController
	before_action :authenticate_user!
	def create
		@user = User.find(params[:friendship][:second_user_id])
		current_user.request! @user
	end

	def update
		@user  = User.find(params[:friendship][:first_user_id])
		current_user.friend! @user
	end

	def destroy
	end

	def friendship_params
		params.require(:friendship).permit(:first_user_id, :second_user_id)
	end

end
