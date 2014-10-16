class Post < ActiveRecord::Base
	belongs_to :user	

	#posts by users friend and by the user
	def self.from_users_friend(user_id)	
		puts Friendship.friend_ids(user_id).push(user_id)
		where(user_id:Friendship.friend_ids(user_id).push(user_id))
	end

end