class Api::Students::StudentCoursesController < Api::Students::BaseController
  load_and_authorize_resource

  def update
    if StudentMailer.course_finish(@student_course.student_id, @student_course.course).deliver_later
      if @student_course.update(update_params)
        render json: @student_course, serializer: StudentCourseSerializer
      end
    end
  end

  def update_params
    params.require(:student_course).permit(
      :sent_email
    )
  end
end
