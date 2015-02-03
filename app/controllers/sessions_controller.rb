class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Incorrect Credentials"]
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to root_url
  end

  private

    def user_params
      params.require(:user).permit(:email, :password)
    end

end
