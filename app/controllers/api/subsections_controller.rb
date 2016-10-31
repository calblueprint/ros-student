class Api::SubsectionsController < Api::BaseController
  load_and_authorize_resource

  def show
    render json: @subsection, serializer: SubsectionSerializer
  end

end
