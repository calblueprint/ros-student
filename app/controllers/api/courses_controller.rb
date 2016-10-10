class Api::CoursesController < Api::BaseController
  load_and_authorize_resource

  def show
    render json: @course, serializer: CourseSerializer
  end

  def outline
    render json: @course, serializer: CourseOutlineSerializer
  end
end
