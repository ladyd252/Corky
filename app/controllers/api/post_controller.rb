module Api
  class PostsController < ApplicationController
    before_action :require_signed_in!

    def create
      puts params
      logger.debug "Post Params: #{params.to_json}"
      @post = Post.new(post_params)
      if @event.save
        render :show
      else
        render json: @post.errors.full_messages, status: 422
      end
    end

    def destroy
      @post = Event.find(params[:id])
      @post.delete
      render :show
    end

  private

    def post_params
      params.require(:post).permit(:title, :event_date)
    end
  end
end
