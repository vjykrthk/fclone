class FriendshipsController < ApplicationController
	#before_action :authenticate_user!
	def create
		@user = User.find(params[:id])
		if current_user.request! @user
			render json: @user, status: 201
		end
	end

	def update
		@user  = User.find(params[:id])
		if current_user.friend! @user
			render json: @user, status: 201
		end
	end

end
