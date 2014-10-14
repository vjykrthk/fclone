class RenameTableFriendRequestFriendRequesting < ActiveRecord::Migration
	def change
		rename_table :friend_requests, :friendship_requesting
	end 
end
