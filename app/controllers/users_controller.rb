class UsersController < ApplicationController
	before_action :authenticate_user!, except: :index

	def index		
		users = User.not_friends(params[:id])
		render json: users
	end

	def friends
		puts Friendship.friend_ids(params[:id])
		friends = User.where(id: Friendship.friend_ids(params[:id]))
		render json: friends		
	end

	def requests
		requests = User.where(id: Friendship.friend_request_ids(params[:id]))
		render json: requests
	end
	
end
