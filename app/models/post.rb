class Post < ActiveRecord::Base
	belongs_to :user	

	def self.from_users_friend(user)
		#when user sends a request he will be the first user and user who accepted the request will be second user
		#when second user accepts the request he becomes first user's friend as also as consequence first user is also
		#second user's  friend
		
		first_user_friends  =  "SELECT second_user_id FROM friendships WHERE first_user_id = :user_id"
		second_user_friends =  "SELECT first_user_id FROM friendships WHERE second_user_id = :user_id"

		where("user_id IN (#{first_user_friends}) OR user_id IN (#{second_user_friends}) OR user_id = :user_id", user_id:user.id)
	end
end