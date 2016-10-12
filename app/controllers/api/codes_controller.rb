class Api::CodesController < Api::BaseController
  load_and_authorize_resource

  def verify
    @code = Code.verify(code_params)
    if @code
      render json: @code, serializer: CodeSerializer
    else
      error_response(nil, 'Invalid Code', 404)
    end
  end

  private

  def code_params
    params.require(:code).permit(:key)
  end
end
