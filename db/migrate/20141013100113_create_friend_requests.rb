class CreateFriendRequests < ActiveRecord::Migration
  def change
    create_table :friend_requests do |t|
      t.integer :requester_id
      t.integer :requesting_id

      t.timestamps
    end
    add_index :friend_requests, :requester_id
    add_index :friend_requests, :requesting_id
    add_index :friend_requests, [:requester_id, :requesting_id], unique: true
  end
end
