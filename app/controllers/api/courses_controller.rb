class Api::CoursesController < Api::BaseController
  load_and_authorize_resource

  def show
    render json: @course, serializer: CourseSerializer
  end

  def outline
    render json: @course, user: current_user, serializer: CourseOutlineSerializer
  end

  def index
    render json: @courses, each_serializer: CourseListSerializer
  end
end
