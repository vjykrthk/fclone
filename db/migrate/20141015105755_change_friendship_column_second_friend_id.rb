class ChangeFriendshipColumnSecondFriendId < ActiveRecord::Migration
  def change  	
    change_column :friendships, :second_friend_id, :integer 
  end
end
