class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :first_user_id
      t.string :second_user_id

      t.timestamps
    end
  end
end
