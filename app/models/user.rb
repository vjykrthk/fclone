class User < ActiveRecord::Base
  mount_uploader :image, UserImageUploader
  include DeviseTokenAuth::Concerns::User
  has_many :posts, dependent: :destroy 
  	has_many :friendship, foreign_key: "first_user_id", dependent: :destroy
	has_many :friends, through: :friendship, source: :second_user
end
