class PagesController < ApplicationController
  def home
    if signed_in?
      redirect_to dashboard_path
    end
  end

  def dashboard
    unless signed_in?
      redirect_to root_path
    end
  end
end
