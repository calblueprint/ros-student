class Api::SubsectionsController < Api::BaseController
  load_and_authorize_resource

  def show
    render json: @subsection, user: current_user, serializer: SubsectionSerializer
  end
end
