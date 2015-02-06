module Api
  class PostsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
      event = Event.find_by_phone_number(params["To"])
      post_params = {
        body: params["Body"],
        event_id: event.id
      }

      num_pics = params["NumMedia"].to_i
      (0..num_pics-1).each do |i|
        post_params["picture_url"] = params["MediaUrl".concat(i.to_s)]
        @post = Post.new(post_params)
        if @post.save
          Pusher.app_id = ENV["pusher_app_id"]
          Pusher.key = ENV["pusher_key"]
          Pusher.secret = ENV["pusher_secret"]
          Pusher.trigger(["event#{event.id}"],"fetchPosts")
        else
          render json: @post.errors.full_messages, status: 422
        end
      end
    end

    def destroy
      @post = Post.find(params[:id])
      @post.delete
      render :show
    end

  # private
  #
  #   def post_params
  #     params.require(:post).permit(:title, :event_date)
  #   end
  end
end
