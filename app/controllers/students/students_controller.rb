class Students::StudentsController < Students::BaseController
  skip_before_filter :authenticate_student!, only: [:create, :reset_password]

  load_and_authorize_resource

  def create
    @code = Code.verify(code_params)
    if @code
      @student.code = @code
      if @student.save
        sign_in(:student, @student)
        redirect_to dashboard_path
      else
        @error = Error.new(@student, nil,
                   code: code_params,
                   student: student_params)
        render 'pages/home'
      end
    else
      @error = Error.new(nil, 'Invalid Code', code: code_params)
      render 'pages/home'
    end
  end


  private

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
    params.fetch(:code, {}).permit(
      :key,
    )
  end
end
