class UsersController < ApplicationController
	def list_of_users		
		users = User.where.not(id:params[:id])
		render json: users
	end
end
