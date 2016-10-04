class Students::StudentsController < Students::BaseController
  skip_before_filter :authenticate_student!, only: :create

  load_and_authorize_resource

  def create
    if @student.save
      sign_in(:student, @student)
      redirect_to dashboard_path
    else
      redirect_to root_path
    end
  end

  def edit
  end

  def student_params
    params.require(:student).permit(:email, :password, :password_confirmation)
  end
end
