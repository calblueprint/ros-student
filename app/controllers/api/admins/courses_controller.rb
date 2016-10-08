class Api::Admins::CoursesController < Api::Admins::BaseController
  load_and_authorize_resource

  def create
    if @course.save
      render json: @course, serializer: CourseSerializer
    else
      error_response(@course)
    end
  end

  def update
    if @course.update(course_params)
      render json: @course, serializer: CourseSerializer
    else
      error_response(@course)
    end
  end

  def destroy
    if @course.destroy
      render json: @course, serializer: CourseSerializer
    else
      error_response(@course)
    end
  end

  private

  def course_params
    params.require(:course).permit(
      :name,
      :description
    )
  end
end
