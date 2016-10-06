class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  rescue_from CanCan::AccessDenied do |exception|
    redirect_user
  end

  def after_sign_in_path_for(user)
    redirect_user
  end

  def after_sign_out_path_for(user)
    redirect_user
  end

  def redirect_user
    if signed_in?
      dashboard_path
    else
      root_path
    end
  end

  def signed_in?
    current_admin || current_student
  end
end
