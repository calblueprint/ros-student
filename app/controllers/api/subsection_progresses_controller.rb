class Api::SubsectionProgressesController < Api::BaseController
  load_and_authorize_resource

  def show
    render json: @subsection_progress, user: current_user, serializer: SubsectionProgressSerializer
  end

end
