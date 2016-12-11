class Api::Students::CoursesController < Api::Students::BaseController
  load_and_authorize_resource

  def show
    render json: @course, serializer: CourseStudentSerializer
  end

  def index
    render json: @courses, user: current_user, each_serializer: CourseStudentListSerializer
  end

  def outline
    render json: @course, user: current_user, serializer: CourseOutlineSerializer
  end

  def sidebar
    render json: @course, user: current_user, serializer: CourseSidebarSerializer
  end
end
