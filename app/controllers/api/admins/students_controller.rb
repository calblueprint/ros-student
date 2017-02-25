class Api::Admins::StudentsController < Api::Admins::BaseController
  load_and_authorize_resource

  def index
    render json: @students, each_serializer: StudentListSerializer, root: false
  end

  # def show
  #   render json: @student, each_serializer: StudentSerializer
  # end

  def destroy
    if @student.destroy
      render json: @student, serializer: StudentSerializer, root: false
    else
      error_response(@student)
    end
  end
end
