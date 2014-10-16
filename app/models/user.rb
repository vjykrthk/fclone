class User < ActiveRecord::Base
	mount_uploader :image, UserImageUploader
	include DeviseTokenAuth::Concerns::User
	
	has_many :posts, dependent: :destroy 

	#first_user is the one sending the friend requesting second_user is the one to whom the request is being send
	has_many :friendships, foreign_key: "first_friend_id", dependent: :destroy
	has_many :second_friends, through: :friendships, source: :second_friend
	has_many :inverse_friendships, foreign_key: "second_friend_id", class_name: "Friendship", dependent: :destroy
	has_many :first_friends, through: :inverse_friendships, source: :first_friend

	
	#creates a friend by setting accepted to true
	def friend!(other_user)
		friendship = Friendship.where(first_friend_id: other_user.id, second_friend_id: id).first
		friendship.accepted = 1
		friendship.save
	end

	#creates a friend request in friendship table
	def request!(other_user)		
		friendships.create!(second_friend_id: other_user.id);
	end	

	#users who are friends and does not include current user
	def self.not_friends(id)
		where.not(id:Friendship.friend_ids(id).push(id))
	end
	

end
