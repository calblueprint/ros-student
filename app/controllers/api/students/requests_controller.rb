class Api::Students::RequestsController < Api::Students::BaseController
  load_and_authorize_resource

  def create
    @request.student_id = current_user.id
    if @request.save
      @request.generate_request(request_args)
      render json: @request, serializer: RequestSerializer
    else
      error_response(@request)
    end
  end

  def request_args
    params.require(:request_args).permit(
      :course_ids,
      :state
    )
  end
end
