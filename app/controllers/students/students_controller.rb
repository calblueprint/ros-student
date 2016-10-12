class Students::StudentsController < Students::BaseController
  skip_before_filter :authenticate_student!, only: :create

  load_and_authorize_resource

  def create
    @code = Code.verify(code_params)
    if @code
      @student.code = @code
      if @student.save
        sign_in(:student, @student)
        redirect_to dashboard_path
      else
        @error = Error.new(@student.errors)
        redirect_to students_sign_up_path
      end
    else
      @error = Error.new(nil, 'Invalid Code')
      redirect_to students_sign_up_path
    end
  end

  def edit
  end

  def student_params
    params.require(:student).permit(
      :email,
      :username,
      :first_name,
      :last_name,
      :password,
      :password_confirmation,
    )
  end

  def code_params
    params.require(:code).permit(
      :key,
    )
  end
end
