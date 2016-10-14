class Admins::CoursesController < Admins::BaseController
  load_and_authorize_resource

  def create
    @course = Course.create
    redirect_to edit_course_path(@course)
  end

  def edit
  end

end
