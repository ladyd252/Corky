module Api
  class PostsController < ApplicationController
    before_action :require_signed_in!
    skip_before_action :verify_authenticity_token

    def create
      puts params
      logger.debug "Post Params: #{params.to_json}"
      post_params = {
        body: params["Body"],
        event_id: Event.find_by_phone_number(params["To"]).id
      }

      num_pics = params["NumMedia"].to_i
      (0..num_pics).each do |i|
        post_params["picture_url"] = params["MediaUrl".concat(i.to_s)]
        @post = Post.new(post_params)
        if @post.save
          # render :show
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
