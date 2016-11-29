class Api::Admins::StudentsController < Api::Admins::BaseController
  load_and_authorize_resource

  def index
    render json: @students, each_serializer: StudentListSerializer, root: false
  end
end
