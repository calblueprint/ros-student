class Api::Students::SubsectionsController < Api::Students::BaseController
  load_and_authorize_resource

  def show
    render json: @subsection,
           user: current_user,
           root: false,
           serializer: SubsectionStudentSerializer
  end
end
