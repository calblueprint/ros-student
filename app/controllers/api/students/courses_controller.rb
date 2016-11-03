class Api::Students::CoursesController < Api::Students::BaseController
  load_and_authorize_resource

  def show
    render json: @course, serializer: CourseSerializer
  end

  def outline
    render json: @course, user: current_user, serializer: CourseOutlineSerializer
  end
end
