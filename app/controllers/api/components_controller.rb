class Api::ComponentController < Api::BaseController
  load_and_authorize_resource

  def show
    render json: @component, serializer: ComponentSerializer
  end

end
