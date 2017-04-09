class Api::Admins::RequestsController < Api::Admins::BaseController
  load_and_authorize_resource

  def update
    if @request.update(update_params)
      render json: @request, serializer: RequestSerializer
    else
      error_response(@request)
    end
  end

  def index
    render json: @requests, each_serializer: RequestListSerializer
  end

  def update_params
    params.require(:update_params).permit(
      :request_id,
    )
  end
end
