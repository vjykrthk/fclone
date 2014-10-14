class UsersController < ApplicationController
	before_action :authenticate_user!, except: :index

	def index		
		users = User.where.not(id:params[:id])
		render json: users
	end

	def friends
		first_friend_friends  =  "SELECT second_friend_id FROM friendships WHERE first_friend_id = :user_id AND accepted=true"
		second_friend_friends =  "SELECT first_friend_id FROM friendships WHERE second_friend_id = :user_id AND accepted=true"		
		friends = User.where("id IN (#{first_friend_friends}) OR id IN (#{second_friend_friends})", user_id:current_user.id)
		render json: friends
	end

	def requests
		friend_requests = "SELECT first_friend_id FROM friendships WHERE second_friend_id = :user_id AND accepted=false"
		requests = User.where("id IN (#{friend_requests})", user_id:current_user.id)
		render json: requests
	end
	
end
