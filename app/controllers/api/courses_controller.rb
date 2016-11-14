class Api::CoursesController < Api::BaseController
  load_and_authorize_resource

  def show
    render json: @course, serializer: CourseSerializer
  end

  def edit
    render json: @course, user: current_user, serializer: CourseEditSerializer
  end

  def index
    render json: @courses, user: current_user, each_serializer: CourseListSerializer
  end
end
