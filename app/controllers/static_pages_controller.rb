class StaticPagesController < ApplicationController
  before_action :require_signed_in!, only: [:root]

  def root
    render :root
  end

  def about
  end

  def contact
  end
end
