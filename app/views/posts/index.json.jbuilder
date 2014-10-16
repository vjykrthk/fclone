json.array! @posts do |post|
	json.(post, :id, :content)  
	json.user post.user  
end