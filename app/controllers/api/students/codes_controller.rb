class Api::Students::CodesController < Api::Students::BaseController
  load_and_authorize_resource

  def add_courses
    @code = Code.verify(code_params)
    if @code && current_user.codes << @code && current_student.subscribe_to_courses
      success_response(
        "Added #{@code.courses.count} #{'course'.pluralize(@code.courses.count)} to your account."
      )
    else
      error_response(nil, 'Invalid Code', 404)
    end
  end

  private

  def code_params
    params.require(:code).permit(:key)
  end
end
