class ChangeFriendshipsColumnsAddColumnAccepted < ActiveRecord::Migration
  def change
  	rename_column :friendships, :first_user_id, :first_friend_id
  	rename_column :friendships, :second_user_id, :second_friend_id
  	add_column 	  :friendships, :accepted, :boolean, default:false
  end
end
