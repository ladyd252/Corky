module Api
  require 'pubnum'
  class PostsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
      # setup pusher credentials
      Pusher.app_id = ENV["pusher_app_id"]
      Pusher.key = ENV["pusher_key"]
      Pusher.secret = ENV["pusher_secret"]

      # check if post came from twilio
      if params["To"]
        event = Event.find_by_phone_number(params["To"])
        post_params = {
          body: params["Body"],
          event_id: event.id
        }

        num_pics = params["NumMedia"].to_i
        if num_pics > 0
          (0..num_pics-1).each do |i|
            post_params["picture_url_twilio"] = params["MediaUrl".concat(i.to_s)]
            @post = Post.new(post_params)
            if @post.save
              Pusher.trigger(["event#{event.id}"],"fetchPosts", {more_pictures: 'lol'})
              render json: {}, status: 200
            else
              render json: @post.errors.full_messages, status: 422
            end
          end
        else

          @post = Post.new(post_params)
          if @post.save

            Pusher.trigger(["event#{event.id}"],"fetchPosts", {more_pictures: 'lol'})
            render json: {}, status: 200
          else
            render json: @post.errors.full_messages, status: 422
          end

        end

      # now handle other posts(filepicker)
      else
        @post = Post.new(post_params_filepicker)
        if @post.save

          Pusher.trigger(["event#{post_params_filepicker[:event_id]}"],"fetchPosts", {more_pictures: 'lol'})
          render json: {}, status: 200
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

    private

      def post_params_filepicker
        params.require(:post).permit(:event_id, :picture_url)
      end

  end
end
