class Friendship < ActiveRecord::Base
	belongs_to :first_friend, class_name: "User"
	belongs_to :second_friend, class_name: "User"	

	class << self

		def friend_ids(user_id)
			first_friend_ids(user_id) + second_friend_ids(user_id)			
		end

		#if a user a send friendship request and his request was accepted		
		def first_friend_ids(user_id)
			ids = []
			where(first_friend_id:user_id).where(accepted:true).map do |f|
				ids << f.second_friend_id
			end
			ids
		end		
		
		#if a user was send friendship request and he accepted
		def second_friend_ids(user_id)
			ids = []
			where(second_friend_id:user_id).where(accepted:true).map do |f|
				ids << f.first_friend_id
			end
			ids
		end

		def friend_request_ids(user_id)
			ids = []
			where(second_friend_id:user_id).where(accepted:false).map do |f|
				ids << f.first_friend_id
			end
			ids
		end
	end

end
