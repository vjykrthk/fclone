class PostsController < ApplicationController
	before_action :authenticate_user!, except: :index
	
	def index
		@posts = Post.from_users_friend(params[:id])
	end
	
	def create
		puts post_params
		post = current_user.posts.build(post_params)
		if post.save
			render json: post, status: 201	
		end		
	end

	private
	def post_params
		#puts params
		params.require(:post).permit(:content)
	end
end
