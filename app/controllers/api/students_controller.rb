class Api::StudentsController < Api::BaseController
  def reset_password
    @student = Student.find_by_email(reset_params)
    if @student.present?
      @student.send_reset_password_instructions
      success_response('You will receive an email shortly with instructions!')
    else
      error_response(nil, 'This email cannot be found.')
    end
  end

  def update
  end

  def reset_params
    params.require(:email)
  end
end
