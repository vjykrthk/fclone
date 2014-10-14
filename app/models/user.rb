class User < ActiveRecord::Base
	mount_uploader :image, UserImageUploader
	include DeviseTokenAuth::Concerns::User
	has_many :posts, dependent: :destroy 

	# Friends
	has_many :friendships, foreign_key: "first_friend_id", dependent: :destroy
	has_many :second_friends, through: :friendships, source: :second_friend
	has_many :inverse_friendships, foreign_key: "second_friend_id", class_name: "Friendship", dependent: :destroy
	has_many :first_friends, through: :inverse_friendships, source: :first_friend

	def friend!(other_user)
		friendship = friendships.where(first_friend_id: other_user.id);		
		friendship.accepted = true
		friendship.save
	end

	def request!(other_user)		
		friendships.create!(second_user_id: other_user.id);
	end

	def feed
		Post.from_users_friend(self)
	end
end
