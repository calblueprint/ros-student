class CoursesController < ApplicationController
  load_and_authorize_resource

  def show
    unless current_user
      redirect_to root_path
    end
  end
end
