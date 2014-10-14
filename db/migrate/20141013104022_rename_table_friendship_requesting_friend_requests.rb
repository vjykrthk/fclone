class RenameTableFriendshipRequestingFriendRequests < ActiveRecord::Migration
  def change
  	rename_table :friendship_requesting, :friendship_requests
  end
end
