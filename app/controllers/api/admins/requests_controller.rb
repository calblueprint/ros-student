class Api::Admins::RequestsController < Api::Admins::BaseController
  load_and_authorize_resource

  has_scope :by_state

  def update
    if @request.update(update_params)
      if @request.send_email
        render json: @request, serializer: RequestSerializer
      else
        error_response(@request)
      end
    else
      error_response(@request)
    end
  end

  def index
    @requests = apply_scopes(Request).all
    render json: @requests, each_serializer: RequestListSerializer
  end

  def update_params
    params.require(:update_params).permit(
      :state,
      :message,
    )
  end
end
