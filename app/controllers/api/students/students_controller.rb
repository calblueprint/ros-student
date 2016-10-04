class Api::Students::StudentsController < Api::Students::BaseController
  load_and_authorize_resource

  def update
    if @student.update_with_password(update_params)
      render json: @student, serializer: StudentSerializer
    else
      error_response(@student)
    end
  end

  private

  def update_params
    params.require(:student).permit(:username,
                                  :email,
                                  :first_name,
                                  :last_name,
                                  :password,
                                  :current_password,
                                  :password_confirmation
  end
end
