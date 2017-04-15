class Api::Students::RequestsController < Api::Students::BaseController
  load_and_authorize_resource

  def create
    if @request.save
      @request.generate_request(request_params)
      render json: @request, serializer: RequestSerializer
    else
      error_response(@request)
    end
  end

  private

  def request_params
    params.require(:request).permit(
      {:course_ids => []}
    )
  end
end
