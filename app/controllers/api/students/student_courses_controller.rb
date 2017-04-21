class Api::Students::StudentCoursesController < Api::Students::BaseController
  load_and_authorize_resource

  def show
    @return_course = StudentCourse.where(student_id: current_user.id, course_id: @student_course)[0]
    render json: @return_course, serializer: StudentCourseListSerializer
  end

  def update
    if !@student_course.sent_email
      if StudentMailer.course_finish(@student_course.student, @student_course.course).deliver_now
        if @student_course.update(update_params)
          render json: @student_course
        else
          error_response(@student_course)
        end
      end
    else
      render json: @student_course
    end
  end

  def update_params
    params.require(:student_course).permit(
      :sent_email,
    )
  end
end
