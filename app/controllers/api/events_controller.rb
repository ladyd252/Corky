module Api
  class EventsController < ApplicationController
    before_action :require_signed_in!

    def show
      @event = Event.find(params[:id])
      if current_user.events.include?(@event)
        render :show
      else
        render json:  ["Not your event"], status: 403
      end
    end


    def create
      @event = current_user.events.new(event_params)
      @event.phone_url = api_posts_url
      if !event_params[:phone_number]
        @event.purchase_num
      end

      if @event.save
        render :show
      else
        render json: @event.errors.full_messages, status: 422
      end
    end

    def update
      @event = Event.find(params[:id])
      if @event.update(event_params)
        render :show
      else
        render json: @event.errors.full_messages, status: 422
      end
    end

    def index
      @events = current_user.events
      render :index
    end

    def destroy
      @event = Event.find(params[:id])
      @event.delete
      render :show
    end

  private

    def event_params
      params.require(:event).permit(:title, :event_date, :phone_number)
    end
  end
end
