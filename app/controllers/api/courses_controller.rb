class Api::CoursesController < Api::BaseController
  load_and_authorize_resource

  def edit
    render json: @course, serializer: CourseEditSerializer
  end

  def sidebar
    render json: @course, user: current_user, serializer: CourseSidebarSerializer
  end

  def index
    render json: @courses, user: current_user, each_serializer: CourseListSerializer
  end
end
