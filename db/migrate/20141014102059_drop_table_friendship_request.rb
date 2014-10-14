class DropTableFriendshipRequest < ActiveRecord::Migration
  def change
  	drop_table :friendship_requests
  end
end
